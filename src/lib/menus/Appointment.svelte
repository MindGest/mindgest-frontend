<script>
    import Details from "$lib/components/Details.svelte";
    import Title from "$lib/components/Title.svelte";
    import Button from "$lib/components/Button.svelte";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api";
    import { page } from "$app/stores";

    let data = null;

    onMount(async () => {
        const id = $page.params['id'];
        console.log(id)
        let response = await api.post("appointment/info", {appointmentId: parseInt(id)});
        if (response.ok) {
            let appointment = (await response.json())["data"];
            let start = new Date(appointment.appointmentStartTime)
            let end = new Date(appointment.appointmentEndTime)
            console.log(appointment)
            data = {
                "Data": start.toISOString().slice(0, 10),
                "Início": String(start.getHours()).padStart(2,0) + ":" + String(start.getMinutes()).padStart(2,0),
                "Fim": String(end.getHours()).padStart(2,0) + ":" + String(end.getMinutes()).padStart(2,0),
                "Sala": appointment.appointmentRoom,
                "Colaboradores": appointment.collaborators,
                "Terapeuta Responsável": appointment.mainTherapist,
                "Utentes": appointment.patients,
                "Referência": appointment.processRef,
                "Especialidade": appointment.speciality
            } 
        } else {
            return alert("Erro ao carregar marcação")
        }
    }); 
    

</script>

{#if data != null}
	<Title text="Detalhes da consulta"/>
	<Details class="mt-5" {data} />
{/if}