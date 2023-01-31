<script>
    import TableMenu from '$lib/menus/TableMenu.svelte';
    import { onMount } from 'svelte';
    import * as api from '$lib/utils/api';
    import { page } from '$app/stores';

    const id =$page.params['id'];
    
    let selected = '';
    let data = null;

  	onMount(async () => {
		let response = await api.get(`process/${id}/notes`);
		if (response.ok) {
			data = (await response.json())["message"];
			console.log(data)
		} else {
			alert("Erro a carregar notas")
		};
  	});
</script>

{#if data != null}
	<TableMenu {data} id="title" add={true} search={['title', 'body']} />
{/if}


