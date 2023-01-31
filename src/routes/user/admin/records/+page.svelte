<!-- 
  Frontend: João Pinto
  Integração: Miguel/Gabriel
  Testing: Miguel
 -->
<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/menus/TableMenu.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let selected = '';
  let data = null;

  onMount(async () => {
    let response = await api.get("process/list")
    if (response.ok) {
      data = (await response.json())['list']
      console.log(data)
    } else {
      alert("Erro ao obter processos")
    }
  });
</script>

{#if data != null}
  <TableMenu
    {data}
    id="processId"
    add={true}
    search={['therapistListing', 'patientName', 'refCode', 'processId']}
    select="speciality"
    {selected}
    check="active"
  />
{/if}
