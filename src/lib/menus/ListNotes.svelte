<script>
    import TableMenu from '$lib/menus/TableMenu.svelte';
    import { onMount } from 'svelte';
    import * as api from '$lib/utils/api';
    import { page } from '$app/stores';

	export let role;
    const id = $page.params['id'];
    
	const INTERN = "intern"

    let selected = '';
    let data = null;

  	onMount(async () => {
		let processId = parseInt(window.location.href.split("/")[window.location.href.split("/").length - 2])
		let permissions = {}
		if (role == INTERN) {
            let responsePermissions = await api.post("permissions/get-intern-permissions", {processId: processId});
            if (responsePermissions.ok) {
                permissions = (await responsePermissions.json())["data"];
                if (!permissions.see) {
                    alert("Não tem permissões para ver este processo");
                    return;
                }
            } else {
                alert("Erro a carregar permissões do estagiário");
                return;
            }
        }
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
	<TableMenu {data} id="id" add={true} search={['title', 'body']} />
{/if}


