<script>
    import Button from "$lib/components/Button.svelte";
    import Selector from "$lib/components/Selector.svelte";
    import Title from "$lib/components/Title.svelte";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api"
    import TextArea from "$lib/components/TextArea.svelte";

    const ADMIN = "admin";
    
    export let role;

    let data = null;

    onMount(async () => {

        let responsePatients = await api.get("patient/list");
        let responseTherapists = await api.get("therapist/list");
        let responseSpecialities = await api.get("speciality/list");

        if (responsePatients.ok && responseTherapists.ok && responseSpecialities.ok){
            let patients = (await responsePatients.json())['message'];
            let therapists = (await responseTherapists.json())['message'];
            let specialities = (await responseSpecialities.json())['data'];

            let patients_names = [];
            patients.forEach(patient => {patients_names.push(formatPatient(patient))});

            let therapists_names = [];
            therapists.forEach(therapist => {therapists_names.push(formatTherapist(therapist))});

            let specialities_names = [];
            specialities.forEach(speciality => {specialities_names.push(speciality.speciality)})

            data = {
                "role": role,

                "specialities": specialities_names,
                "therapists": therapists_names,
                "patients": patients_names,

                "speciality": "",
                "therapist": "",
                "patient": "",
                "remarks": ""

            }
        } else {
            alert("Erro ao carregar dados")
        }

    });

    //TODO:
    async function createRecord() {
        let body = {

        };

        let response = await api.post("process/create", body);
        if (response.ok) {
            alert("Processo criado!")
        } else {
            alert("Erro ao criar processo")
        }

    }

    //TODO:
    async function requestRecord() {
        let body = {

        };

        let response = await api.post("??", body);
        if (response.ok) {
            alert("Pedido de criação de processo enviado!")
        } else {
            alert("Erro ao pedir criação do processo")
        }

    }

    function formatTherapist(therapist) {
        return "[" + therapist.id + "] " + therapist.name;
    }

    function formatPatient(patient) {
        return "[" + patient.id + "] " + patient.name;
    }
</script>


{#if data != null}
    <div class="m-auto flex flex-col w-1/2 ">
        <Title class="my-5" text="Novo Processo"/>
        <Selector class="my-2" label="Especialidade:" values={data.specialities} bind:value={data.speciality}/>
        <Selector class="my-2" label="Adicionar Terapeuta" values={data.therapists} bind:value={data.therapist}/>
        <Selector class="my-2" label="Adicionar Utente:" values={data.patients} bind:value={data.patient}/>
        <TextArea class="my-6" label="Motivação do Pedido:" bind:value={data.remarks} />
        {#if data.role == ADMIN}
            <Button class="mt-10" text="Criar processo" on:click={createRecord}/>
        {:else}
            <Button class="mt-10" text="Enviar pedido de criação de processo" on:click={requestRecord}/>
        {/if}
    </div>
{/if}