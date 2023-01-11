<script>
    import Card from "$lib/components/Card.svelte";

    // FIXME: Integrar com backend
    let consultas = [
        {"name": "Ana Dias", "end": "11h20"},
        {"name": "João Manuel", "end":"11h45"},
        {"name": "João Manuel2", "end":"11h45"},
    ] 
</script>

<div class="grid justify-items-center m-10">
    <h1 class="text-4xl font-bold m-10">Últimas Consultas Terminadas</h1>
    {#each consultas as consulta }
        <Card title="{consulta.name}" subtitle="Terminada às {consulta.end}"/>
    {/each}
</div>



