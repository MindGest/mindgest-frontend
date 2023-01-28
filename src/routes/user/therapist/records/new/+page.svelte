<script>
    import TextBox from '$lib/components/TextBox.svelte';
    import Button from '$lib/components/Button.svelte';
    import Selector from '$lib/components/Selector.svelte';
    import { onMount } from 'svelte';
    //import * as api from '$lib/utils/api';

    /* PARA DEBUGGG*/
    let esp = ['Esp1', 'Esp2', 'Esp3'];
    let terp = ['Maria', 'João', 'Ana'];
    let ut = ['Carolina', 'Daniel', 'Fábio'];

    let new_proc = {
        esp:'',
        terp:'',
        ut:'',
        mot:'',
    }

    onMount(async () => {
        /* help */
    });

    async function addAppointment() {
        /* help */
    }

</script>

<div class="flex flex-col justify-center h-auto w-5/6 m-10 p-5 items-stretch">
    <p class="font-normal text-xl">Novo Processo</p>
    <Selector id="esp" label="Especialidade:" values={esp} bind:value={new_proc.esp}/>
    <Selector id="terp" label="Adicionar Terapeuta" values={terp} bind:value={new_proc.terp}/>
    <Selector id="ut" label="Adicionar Utente:" values={ut} bind:value={new_proc.ut}/>
    <TextBox id="mot" label="Motivação do Pedido:" bind:value={new_proc.mot} class="mt-2"/>
</div>
<div class="my-5 grid grid-cols-2" style="position:relative; left:60%; width:50%">
    <Button text="Enviar pedido de criação de processo" class="mt-10 " on:click={addAppointment}/>
</div>