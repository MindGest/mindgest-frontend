<script>
    import TextBox from '$lib/components/TextBox.svelte';
    import Button from '$lib/components/Button.svelte';
    import Selector from '$lib/components/Selector.svelte';
    import { onMount } from 'svelte';
    import * as api from '$lib/utils/api';

    /* PARA DEBUGGG*/
    let esp = [];
    let terp = [];
    let ut = [];

    let utId = [];
    let terpId = [];

    let new_proc = {
        esp:'',
        terp:'',
        ut:'',
        mot:'',
    }

    onMount(async () => {
        const response = await api.get("patient/list");
        if(response.ok){
            let json = await response.json();

            let info = json['message'];
            let helper = [];
            for(let i=0; i<info.length; i++){
                helper.push(info[i]['name'])
                utId[info[i]['name']]=info[i]['id']
            }
            ut = helper;
        }

        const response1 = await api.get("therapist/list");
        if(response1.ok){
            let json = await response1.json();

            let info = json['message'];
            let helper = [];
            for(let i=0; i<info.length; i++){
                helper.push(info[i]['name'])
                terpId[info[i]['name']]=info[i]['id']
            }
            terp = helper;
        }

        const response2 = await api.get("speciality/list");
        if(response2.ok){
            let json = await response2.json();

            let info = json['data'];
            let helper = [];
            for(let i=0; i<info.length; i++){
                helper.push(info[i]['speciality'])
            }
            esp = helper;
        }

    });

    async function addAppointment() {
        let body = {
            patientIds:[utId[new_proc.ut]],
            therapistId:terpId[new_proc.terp],
            speciality:new_proc.esp,
            remarks:new_proc.mot,
            colaborators:[]
        }

        const response = await api.post("process/create", body);
        if(response.ok){
            //TODO
        }
        else{
            //TODO
        }
    }

</script>

{#if esp!=[]}
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
{/if}