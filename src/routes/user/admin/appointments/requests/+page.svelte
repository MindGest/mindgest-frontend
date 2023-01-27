<script>
    import Button from '$lib/components/Button.svelte';
    import Selector from '$lib/components/Selector.svelte';

    let esps = ["espA", "espB", "espC"]
    let terps = ["Maria", "João", "Ana"]
    let uts = ["Manuel", "Joana", "Rui"]
    let serv = "consulta"
    let motv = "está farto da uni"
    let new_apoint = {
        esp:'',
        terp: '',
        ut: '',
        ser: serv,
        mot: motv
    }

    function acceptRequest() {
        alert('Pedido Aceite!');
        /* quando se aceita o processo, passa a constar na lista de processos */
    }

</script>

<wrapper class="block mb-10 p-5 w-[400px]">
    <Selector id="esp" label="Especialidade:" values={esps} bind:value={new_apoint.esp} />
    <br>
    {#if new_apoint.esp}
        <Selector id="terp" label="Adicionar Terapeuta:" values={terps} bind:value={new_apoint.terp} />
    {/if}
    <br>
    <Selector id="ut" label="Adicionar Utente:" values={uts} bind:value={new_apoint.ut} />
    <br>
    <div class="mt-5 border border-zinc-400 rounded-md p-2"><b>Serviço:</b> {serv}</div>
    <br>
    <div class="mt-5 border border-zinc-400 rounded-md p-2"><b>Motivo do Pedido:</b> {motv}</div>
    <br>
    <Button class="flex ml-5" text="Aceitar Pedido" on:click={acceptRequest()} type="submit"/>
</wrapper>