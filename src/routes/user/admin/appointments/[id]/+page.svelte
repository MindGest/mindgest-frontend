<script>
    import Details from "$lib/components/Details.svelte";
    import Title from "$lib/components/Title.svelte";
    import Button from "$lib/components/Button.svelte";
    import { onMount } from "svelte";

    let data = null;

    onMount(async () => {

    });
    

</script>

{#if data != null}
	<Title text="Detalhes de consulta de"/>
	<Details class="mt-5" {data} />
	<div class="mx-40 grid grid-cols-2">
		<Button class="m-5" text="Ver Notas" />
		
	</div>
{/if}