<script>
    import * as api from "$lib/utils/api";
    import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import Selector from "./Selector.svelte";
    import TextBox from "./TextBox.svelte";
    import Title from "./Title.svelte";


    let data = null;

    onMount(async () => {
        let currentDate = new Date();
        data = {
            date: currentDate.toISOString().slice(0, 10),
            start: currentDate.getHours() + ":" + currentDate.getMinutes(),
            end: currentDate.getHours()  + ":" + currentDate.getMinutes(),
            values: []
        }
    })

    async function options() {
        let response = await api.get()
        if (response.ok) {

        } else {

        }
    }

</script>

{#if data != null}
    <div class="text-center">
        <div class="flex flex-cols w-1/3 m-auto">
            <TextBox class="m-auto w-full pl-2 pr-4" label="Data" type="date" bind:value={data.date} on:change={values = []}/>
            <TextBox class="m-auto w-full p-2" label="Horas Início" type="time" bind:value={data.start} on:change={values = []}/>
            <TextBox class="m-auto w-full p-2" label="Horas Fim" type="time" bind:value={data.end} on:change={values = []}/>
        </div>
        <Selector class="w-1/3 p-2 m-auto" values={options}/>
        <Button class="w-1/3 p-2 m-auto" text="Criar Consulta"/>
    </div>
{/if}
