<script>
    import Details from "$lib/components/Details.svelte";
    import Title from "$lib/components/Title.svelte";
    import Button from "$lib/components/Button.svelte";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api";
    import { page } from "$app/stores";

    const ADMIN = "admin"
    const THERAPIST = "therapist"
    const INTERN = "intern"

    export let role;

    let data = null;
    let permissions = {}

    onMount(async () => {
        const id = $page.params['id'];

        let response = await api.post("appointment/info", {appointmentId: parseInt(id)});
        if (!response.ok) {
            return alert("Erro ao carregar marcação")
        }

        if (role == INTERN) {
            let responsePermissions = await api.post("permissions/get-intern-permissions", {processId: appointment.processId});
            if (!responsePermissions.ok) {
                return alert("Erro a carregar permissões do estagiário");
            } 
            permissions = (await responsePermissions.json())["data"];
		}

        let appointment = (await response.json())["data"];
        let start = new Date(appointment.appointmentStartTime)
        let end = new Date(appointment.appointmentEndTime)

        data = {
            "id": appointment.appointmentId,
            "Data": start.toISOString().slice(0, 10),
            "Início": String(start.getHours()).padStart(2,0) + ":" + String(start.getMinutes()).padStart(2,0),
            "Fim": String(end.getHours()).padStart(2,0) + ":" + String(end.getMinutes()).padStart(2,0),
            "Sala": appointment.appointmentRoom,
            "Colaboradores": appointment.collaborators,
            "Terapeuta Responsável": appointment.mainTherapist,
            "Utentes": appointment.patients,
            "Referência": appointment.processRef,
            "Especialidade": appointment.speciality,
            "arquivado": appointment.appointmentArchived
        } 

    }); 
    
    async function mark() {
        let responseArchive = await api.put("appointment/archive", {appointmentId: data.id, archiveDate: new Date().toISOString()});
        if (!responseArchive.ok) {
            return alert("Erro ao arquivar consulta");
        }

        let responseReceipt = await api.post(`appointment/${data.id}/receipt`);
        if (!responseReceipt.ok) {
            return alert("Erro ao gerar recibo");
        }

        data.arquivado = true;
    }

</script>

{#if data != null}
	<Title text="Detalhes da consulta"/>
	<Details class="mt-5" {data} />
    {#if !data.arquivado}
        {#if role == ADMIN || role == THERAPIST || (role == INTERN && permissions.archive)}
            <Button class="mt-5 w-1/3" text="Efetivar Consulta" on:click={mark}/>
        {/if}
    {/if}
{/if}