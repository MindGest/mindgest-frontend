<script>
    import { page } from "$app/stores";
  import Details from "$lib/components/Details.svelte";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api"
  import Title from "$lib/components/Title.svelte";
  import Button from "$lib/components/Button.svelte";

    let data = null
    onMount(async () => {


        const id = $page.params['id'];
        let responseReceipt = await api.get(`/receipt/${id}/info`);
        if (!responseReceipt.ok) {
            return alert("Erro ao carregar recibo")
        }

        data = (await responseReceipt.json())["data"]
        console.log(data)
    });

    async function togglePayment() {
        const id = $page.params['id'];
        let response = await api.put(`/receipt/${id}/pay`);
        if (response.ok) {
            data.payed = !data.payed;
        } else {
            alert("Erro ao marcar/desmarcar como pago")
        }

    }
</script>

{#if data != null} 
    <Title class="" text="Recibo"/>
    <Details class="mt-5" {data}/>
    <Button class="mt-10 w-1/3" text={(data.payed ? "Desmarcar": "Marcar") + " como pago"} on:click={togglePayment}/>
{/if}

