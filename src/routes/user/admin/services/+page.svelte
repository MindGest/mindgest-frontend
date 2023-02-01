<script>
	// import { goto } from '$app/navigation';
	import TableMenu from '$lib/menus/TableMenu.svelte';
	import { onMount } from 'svelte';
	import * as api from '$lib/utils/api';

	let data = null;

	onMount(async () => {
		let response = await api.get('speciality/list');
		if (response.ok) {
			data = (await response.json())["data"]
			console.log(data)
		} else {
			alert("Erro ao carregar serviços")
		}

	});
</script>

{#if data != null}
	<TableMenu
		data={data}
		id="speciality"
		add={true}
		search={['speciality', 'code', 'description']}
	/>
{/if}
