<script>
    import Button from "$lib/components/Button.svelte";
    import Selector from "$lib/components/Selector.svelte";
    import Title from "$lib/components/Title.svelte";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api"
    import TextArea from "$lib/components/TextArea.svelte";
    import TextDisplay from "$lib/components/TextDisplay.svelte";
  import EditView from "$lib/components/EditView.svelte";
  import TextBox from "$lib/components/TextBox.svelte";

    const ADMIN = "admin";
    
    export let role;

    let data = null;

    onMount(async () => {

        let responsePatients = await api.get("patient/list");
        let responseTherapists = await api.get("user/get-all-therapists");
        let responseSpecialities = await api.get("speciality/list");
        let responseLiables = await api.get("liable/list");

        if (responsePatients.ok && responseTherapists.ok && responseSpecialities.ok && responseLiables.ok){
            let patients = (await responsePatients.json())['data'];
            let therapists = (await responseTherapists.json())["data"];
            let specialities = (await responseSpecialities.json())['data'];
            let liables = (await responseLiables.json())["data"];
            
            let patients_names = [];
            patients.forEach(patient => {patients_names.push(formatPatient(patient))});

            let therapists_names = [];
            therapists.forEach(therapist => {therapists_names.push(formatTherapist(therapist))});

            let specialities_names = [];
            specialities.forEach(speciality => {specialities_names.push(speciality.speciality)});

            let liables_names = []
            liables.forEach(liable => {liables_names.push(formatLiable(liable))})

            data = {
                "role": role,

                "specialities": specialities_names,
                "therapists": therapists_names,
                "patients": patients_names,
                "liables": liables_names,

                "speciality": "",
                "therapist": "",
                "remarks": "",
                "chosenPatients": [],
                "chosenLiables": []

            }
        } else {
            alert("Erro ao carregar dados")
        }
    });

    function getBody() {
        let patientIds = [];
        data.chosenPatients.forEach(patient => {patientIds.push(getId(patient))});

        let liableIds = [];
        data.chosenLiables.forEach(liable => {liableIds.push(getId(liable))});

        return {
            speciality: data.speciality,
            patientIds: patientIds,
            liableIds: liableIds,
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

    async function requestRecord() {
        let body = getBody()

        body = {
            "type": "process",
            "data": JSON.stringify(body),
        }
        
        if (body != null) {    
            let response = await api.post("notification/create", body);
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

    function formatLiable(liable) {
        return "[" + liable.liableId + "] " + liable.name;
    }

    function getId(person) {
        return parseInt(person.split("]")[0].split("[")[1])
    }

</script>


{#if data != null}
    <div class="flex">
        <div class="flex flex-col w-2/5 px-10">
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
        <div class="mt-12 w-1/3 p-5">
            <EditView title="Utentes" bind:values={data.patients} bind:chosen={data.chosenPatients}/>
        </div>
        <div class="mt-12 w-1/3 p-5">
            <EditView title="Responsáveis" bind:values={data.liables} bind:chosen={data.chosenLiables}/>
        </div>



    </div>
{/if}