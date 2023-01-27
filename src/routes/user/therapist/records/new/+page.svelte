<script>
    import TextBox from '$lib/components/TextBox.svelte';
    import Button from '$lib/components/Button.svelte';
    import Selector from '$lib/components/Selector.svelte';
    import { onMount } from 'svelte';
    import * as api from '$lib/utils/api';

    /* PARA DEBUGGG*/
    let esp = [{ text: 'Esp1' }, { text: 'Esp2' }, { text: 'Esp3' }];
    let terp = [{ text: 'Maria' }, { text: 'João' }, { text: 'Ana' }];
    let ut = [{ text: 'Carolina' }, { text: 'Daniel' }, { text: 'Fábio' }];

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
    <Selector
        id="esp"
        label="Especialidade:"
        options={esp}
        display_func={o => o.text}
        bind:value={new_proc.esp}
        class="grid grid-cols-4 items-center font-bold"
    />
    <Selector
        id="terp"
        label="Adicionar Terapeuta"
        options={terp}
        display_func={o => o.text}
        bind:value={new_proc.terp}
        class="grid grid-cols-4 items-center font-bold"
    />
    <Selector
        id="ut"
        label="Adicionar Utente:"
        options={ut}
        display_func={o => o.text}
        bind:value={new_proc.ut}
        class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
        id="mot"
        label="Motivação do Pedido:"
        bind:value={new_proc.mot}
        class="grid grid-cols-4 items-center font-bold"
    />
</div>
<div class="my-5 grid grid-cols-2" style="position:relative; left:60%; width:50%">
    <Button text="Enviar pedido de criação de processo" class="mt-10 " on:click={addAppointment}/>
</div>