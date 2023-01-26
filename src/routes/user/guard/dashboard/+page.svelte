<script>
    import Card from "$lib/components/Card.svelte";
    import { onMount } from "svelte";
    import * as api from '$lib/utils/api';


    let consultas = [
        // {
        //     "appointmentStartTime": "2023-01-26T15:03:00.000Z",
        //     "appointmentEndTime": "2023-01-26T15:30:00.000Z",
        //     "appointmentRoom": "Sala X",
        //     "therapists": [
        //         {"name": "Miguel1"},
        //         {"name": "Gabriel1"}
        //     ],
        //     "speciality": "string"
        // },
        // {
        //     "appointmentStartTime": "2023-01-26T20:03:00.000Z",
        //     "appointmentEndTime": "2023-01-26T20:30:00.000Z",
        //     "appointmentRoom": "Sala X",
        //     "therapists": [
        //         {"name": "Miguel2"},
        //         {"name": "Gabriel2"}
        //     ],
        //     "speciality": "string"
        // },
    ]

    //TODO: Integrate
    // À partida está feito.
    onMount(async () => {
        const response = await api.get("/appointment/listAppointmentsOfTheDayGuard", {});

        if (response.ok){
            let json = await response.json();
            let jsonInfo = json['data'];
            consultas = jsonInfo;
        }
    })

    function getTitle(therapists) {
        let str = "Dr. " +therapists[0].name
        for (let i = 1; i < therapists.length; i++) {
            str += " e Dr. " + therapists[i].name
        }
        return str 
    }

    function getSubtitle(room, startTime, endTime) {
        return room + "; " + new Date(startTime).toLocaleTimeString().slice(0,5) + " até " + new Date(endTime).toLocaleTimeString().slice(0,5);
    }

</script>

<div class="grid grid-cols-2 justify-items-center">
    <div>
        <h1 class="text-4xl font-bold m-10">Consultas do dia</h1>
        {#each consultas as consulta}
            <Card class="w-fill my-5" title={getTitle(consulta.therapists)} text="{getSubtitle(consulta.appointmentRoom, consulta.appointmentStartTime, consulta.appointmentEndTime)}" />
        {/each}
    </div>
    <div>
        <h1 class="text-4xl font-bold m-10">Consultas a decorrer</h1>
        {#each consultas as consulta}
            {#if new Date(consulta.appointmentStartTime) < new Date() && new Date() <  new Date(consulta.appointmentEndTime) }
                <Card class="w-fill my-5" title={getTitle(consulta.therapists)} text="{getSubtitle(consulta.appointmentRoom, consulta.appointmentStartTime, consulta.appointmentEndTime)}" />
            {/if}
        {/each}
    </div>
</div>