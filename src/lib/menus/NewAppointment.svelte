<script>
  import { goto } from "$app/navigation";
    import * as api from "$lib/utils/api";
    import { onMount } from "svelte";
    import Button from "../components/Button.svelte";
    import Selector from "../components/Selector.svelte";
    import TextBox from "../components/TextBox.svelte";
    import Title from "../components/Title.svelte";


    let data = null;

    onMount(async () => {
        
        let responseRecords = await api.get("process/list")
        if (!responseRecords.ok) {
            return alert("Erro ao carregar processos")
        }
        
        let responsePrices = await api.get("price/list");
        if (!responsePrices.ok) {
            return alert("Erro ao carregar preços")
        }

        let records = (await responseRecords.json())["data"];
        
        let records_names = [];
        records.forEach(record => {records_names.push(formatRecord(record))})
        
        let prices = (await responsePrices.json())["data"];

        let prices_names = [];
        prices.forEach(price => {prices_names.push(formatPrice(price))})
        
        let currentDate = new Date();
        data = {
            date: currentDate.toISOString().slice(0, 10),
            start: String(currentDate.getHours()).padStart(2,0) + ":" + String(currentDate.getMinutes()).padStart(2,0),
            end: String(currentDate.getHours()).padStart(2,0)  + ":" + String(currentDate.getMinutes()).padStart(2,0),
            
            values: [],
            value: "",
            
            online: "",
            
            records: records_names,
            record: "",
        
            prices: prices_names,
            price: "",
        }
        options()
        console.log(data)

    })

    async function options() {
        let startDate = new Date(data.date);
        startDate.setHours(parseInt(data.start.split(":")[0]), parseInt(data.start.split(":")[1]));

        let endDate = new Date(data.date);
        endDate.setHours(parseInt(data.end.split(":")[0]), parseInt(data.end.split(":")[1]))
        

        if (startDate >= endDate) {
            data.value = "";
            data.values = []
            return
        }

        let body = {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        }

        let response = await api.post("rooms/get-available-rooms", body);
        if (response.ok) {
            let rooms = (await response.json())["data"]
            let rooms_names = []
            rooms.forEach(room => {rooms_names.push(formatRoom(room))});
            data.values = rooms_names
        } else {
            alert("Erro ao carregar salas disponíveis")
        }
    }

    function formatRecord(record) {
        return "[" + record.processId + "] " + record.ref
    }

    function formatRoom(room) {
        return "[" + room.id + "] " + room.name
    }
    
    function formatPrice(price) {
        return "[" + price.id + "] " + price.price + '€'
    }

    async function create() {
        let startDate = new Date(data.date);
        startDate.setHours(parseInt(data.start.split(":")[0]), parseInt(data.start.split(":")[1]));

        let endDate = new Date(data.date);
        endDate.setHours(parseInt(data.end.split(":")[0]), parseInt(data.end.split(":")[1]))

        let processId = parseInt(data.record.split("]")[0].split("[")[1]);
        let roomId = parseInt(data.value.split("]")[0].split("[")[1]);
        let priceId = data.price.split("]")[0].split("[")[1]

        let body = {
            processId: processId,
            online: data.online == "Sim" ? true : false,
            roomId: roomId,
            priceTableId: priceId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }
        console.log(body)

        let response = await api.post("appointment/create", body);
        if (response.ok) {
            alert("Sucesso: Consulta marcada")
        } else {
            return alert("Erro ao marcar consulta")
        }

        goto(window.location.href.split("/").slice(0, window.location.href.split("/").length - 1).join("/"))
    }

</script>

{#if data != null}
    <div class="text-center">
        <Title class="mb-10" text="Marcar Consulta"/>
        <div class="flex flex-cols w-1/3 m-auto">
            <TextBox class="m-auto w-full pl-2 pr-4" label="Data" type="date" bind:value={data.date} on:change={options}/>
            <TextBox class="m-auto w-full p-2" label="Horas Início" type="time" bind:value={data.start} on:change={options}/>
            <TextBox class="m-auto w-full p-2" label="Horas Fim" type="time" bind:value={data.end} on:change={options}/>
        </div>
        <Selector class="w-1/3 p-2 m-auto" placeholder="Escolha uma sala" values={data.values} bind:value={data.value}/>
        <Selector class="w-1/3 p-2 m-auto" placeholder="Online?" values={["Sim", "Não"]} bind:value={data.online}/>
        <Selector class="w-1/3 p-2 m-auto" placeholder="Processo" values={data.records} bind:value={data.record}/>
        <Selector class="w-1/3 p-2 m-auto" placeholder="Valor da Consulta" values={data.prices} bind:value={data.price}/>

        <Button class="w-1/3 p-2 m-auto" text="Criar Consulta" on:click={create}/>
    </div>
{/if}
