<script>
    import Button from "$lib/components/Button.svelte";
    import Selector from "$lib/components/Selector.svelte";
    import Title from "$lib/components/Title.svelte";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api"
    import TextArea from "$lib/components/TextArea.svelte";
    import TextDisplay from "$lib/components/TextDisplay.svelte";

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
                "selected_patients": [],
                "remarks": ""

            }
        } else {
            alert("Erro ao carregar dados")
        }
    });

    function getBody() {
        if (data.speciality == "" || data.therapist == "" || data.selected_patients.length < 1) {
            alert("É necessário preencher os campos")
            return null;
        }

        let patientIds = [];
        data.selected_patients.forEach(patient => {patientIds.push(getId(patient))});
        return {
            speciality: data.speciality,
            patientIds: patientIds,
            therapistId: getId(data.therapist),
            remarks: data.remarks,
        };
    }   

    async function createRecord() {
        let body = getBody()
        if (body != null) {   
            let response = await api.post("process/create", body);
            if (response.ok) {
                alert("Processo criado!")
            } else {
                alert("Erro ao criar processo")
            }
        }

    }

    //TODO:
    async function requestRecord() {
        let body = getBody()
        if (body != null) {    
            let response = await api.post("??", body);
            if (response.ok) {
                alert("Pedido de criação de processo enviado!")
            } else {
                alert("Erro ao pedir criação do processo")
            }
        }
            
    }

    function formatTherapist(therapist) {
        return "[" + therapist.id + "] " + therapist.name;
    }

    function formatPatient(patient) {
        return "[" + patient.id + "] " + patient.name;
    }

    function addPatientUI() {
        if (data.patient != "") {
            data.selected_patients.push(data.patient)
            data.patient = ""
        }
    }

    function removePatientUI(id) {
        data.selected_patients = data.selected_patients.filter(patient => getId(patient) != id)
    }

    function options(data) {
        let options = [];

        let picked = [];
        data.selected_patients.forEach(patient => {
            picked.push(patient)
        });

        data.patients.forEach(patient => {
            if (!picked.includes(patient)) {
                options.push(patient)
            }
        });

        return options;
    }

    function getId(person) {
        return parseInt(person.split("]")[0].split("[")[1])
    }

</script>


{#if data != null}
    <div class="grid grid-cols-2">
        <div class="m-auto flex flex-col w-2/3">
            <Title class="my-5" text="Novo Processo"/>
            <Selector class="my-2" label="Especialidade:" values={data.specialities} bind:value={data.speciality}/>
            <Selector class="my-2" label="Profissional Responsável" values={data.therapists} bind:value={data.therapist}/>
            <TextArea class="my-6" label="Motivação do Pedido:" bind:value={data.remarks} />
            {#if data.role == ADMIN}
                <Button class="mt-10" text="Criar processo" on:click={createRecord}/>
            {:else}
                <Button class="mt-10" text="Enviar pedido de criação de processo" on:click={requestRecord}/>
            {/if}
        </div>
        <div>
            <Title class="my-9" text="Adicionar Utentes"/>
            <div class="flex flex-line">
                <Selector class="my-2 w-2/3" values={options(data)} bind:value={data.patient} placeholder="Escolha um utente"/>
                <Button class="m-auto w-10 h-10" text="+" on:click={() => addPatientUI()}/>
            </div>
                
            {#each data.selected_patients as patient}
                <div class="flex flex-line">
                    <TextDisplay class="my-2 w-2/3" value={patient}/>
                    <Button class="m-auto w-10 h-10" text="-" on:click={() => removePatientUI(getId(patient))}/>
                </div>
            {/each}
        </div>


    </div>
{/if}