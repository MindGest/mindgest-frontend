<script>
    import Card from "$lib/components/Card.svelte";
    import { onMount } from "svelte";

    let consultas = [
        {
            "appointmentStartTime": "2023-01-26T15:03:00.000Z",
            "appointmentEndTime": "2023-01-26T15:30:00.000Z",
            "appointmentRoom": "Sala X",
            "therapists": [
                {"name": "Miguel1"},
                {"name": "Gabriel1"}
            ],
            "speciality": "string"
        },
        {
            "appointmentStartTime": "2023-01-26T20:03:00.000Z",
            "appointmentEndTime": "2023-01-26T20:30:00.000Z",
            "appointmentRoom": "Sala X",
            "therapists": [
                {"name": "Miguel2"},
                {"name": "Gabriel2"}
            ],
            "speciality": "string"
        },
    ]

    //TODO: Integrate (consultas do próprio (logged in user))
    onMount(async () => {})

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

<div class="grid grid-cols-1 justify-items-center">

</div>

{#if consultas != []}
  <div class="block justify-items-center text-center m-10">
    <h1 class="text-4xl font-bold m-10">Consultas do dia</h1>
    {#each consultas as consulta}
        <Card class="m-auto w-1/2 my-5" title={getTitle(consulta.therapists)} text="{getSubtitle(consulta.appointmentRoom, consulta.appointmentStartTime, consulta.appointmentEndTime)}" />
    {/each}
  </div>
{/if}