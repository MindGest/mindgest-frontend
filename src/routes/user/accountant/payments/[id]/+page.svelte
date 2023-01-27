<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import Button from '$lib/components/Button.svelte';
    import * as api from '$lib/utils/api';

    
    let paymentId = "";
    let data = {};
    
    onMount(async () => {
        paymentId = window.location.href.split("/").pop();
        data = await getPaymentData(paymentId);
    });

    async function getPaymentData(id) {
        // TODO: Integração

        const response = await api.get(`receipts/info/${id}`);

        if (response.ok) {
            let json = await response.json();
            if (json['paid']) {
                json.estado = "Pago"
            } else {
                json.estado = "Por Pagar"
            }
            return json;
        } 
    }
    
    async function updatePaymentStatus(payed) {
        // TODO: Integração BD
        // payed: False -> Desmarcar como pago
        //        True  -> Marcar como pago
        if (payed) {
            data.estado = "Pago"
        } else {
            data.estado = "Por Pagar"
        }

        const response = await api.put(`receipts/pay/${paymentId}`);

        if (response.ok) {
            //TODO: MOSTRAR ALGO
        } 
        else{
            //TODO: MOSTRAR ALGO
        }
    }

</script>

{#if paymentId != ""}
        
    <h1 class="text-4xl font-bold mx-40 my-10">Detalhes da Consulta [{paymentId}]</h1>
    <div class="mx-40 my-10">
        <div class="my-5">
            <bold class="font-bold">Nome do(a) Utente:</bold> {data.name}
        </div> 
        <div class="my-5">
            <bold class="font-bold">NIF:</bold> {data.tax_number}
        </div>
        <div class="my-5">
            <bold class="font-bold">Número Sistema Saúde:</bold> {data.sns}
        </div>
        <div class="my-5">
            <bold class="font-bold">Morada Fiscal:</bold> {data.address}
        </div>
        <div class="my-5">
            <bold class="font-bold">E-mail:</bold> {data.email}
        </div>
        <div class="my-5">
            <bold class="font-bold">Responsável:</bold> {data.responsavel}
        </div>
        <div class="my-5">
            <bold class="font-bold">Estado da Consulta:</bold> {data.estado}
        </div>
        <div class="my-5">
            <bold class="font-bold">Data da Consulta:</bold> {data.data}
        </div>
        <div class="my-8 font-bold text-red-500">Valor Total: {data.custo} €</div>
    </div>

    <div class="mx-40 grid grid-cols-2">
        <Button class="m-5" text="Voltar"/>
        {#if data.estado == "Pago"}
            <Button class="m-5" text="Desmarcar como Pago" on:click={() => updatePaymentStatus(false)}  />
        {:else}
            <Button class="m-5" text="Marcar como Pago" on:click={() => updatePaymentStatus(true)}/>
        {/if}
    </div>
{/if}