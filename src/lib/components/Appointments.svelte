<script>
    import TableMenu from "$lib/menus/TableMenu.svelte";
    import { onMount } from 'svelte';
    import * as api from '$lib/utils/api';

    export let role;

    let data = null;

    onMount(async () => {
        let response = await api.post(`appointment/list`, {filterId: -1});
        if (!response.ok) {
            return alert("Erro a carregar as consultas")
        }
        let appointmentsData = (await response.json())["data"];
        console.log(appointmentsData)
        let appointments = []
        appointmentsData.forEach(x => {
            appointments.push({
                "id": x.appointmentId,
                "start": x.appointmentStartTime.slice(0,10), 
                "end": x.appointmentEndTime.slice(0,10),
                "room": x.appointmentRoom,
                "therapists": x.therapists,
                "speciality": x.speciality,
                "utentes": x.patients
            })
        });
        data = appointments
    });
</script>

{#if data != null}
    <TableMenu
        {data}
        id="id"
        add={role != ""}
        search={["id", "start", "end", "room", "therapists", "speciality"]}
    />
{/if}