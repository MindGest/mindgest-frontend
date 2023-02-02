<script>
    import Details from "$lib/components/Details.svelte";
    import Title from "$lib/components/Title.svelte";
    import Button from "$lib/components/Button.svelte";

    data = {
        therapist_name: 'João Silva',
        process_id: '123456',
        patient_name: 'João Silva',
        specialty: 'Psicologia',
        date: '01/01/2021',
        time: '10:00',
        duration: '1h',
        room: 'Sala 1',
    };
    

</script>

<Title text="Detalhes de consulta de"/>
<Details class="mt-5" data />
<div class="mx-40 grid grid-cols-2">
  <Button class="m-5" text="Ver Notas" />
  
</div>