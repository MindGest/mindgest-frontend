<!-- 
  Frontend: João Pinto
  Integração: Miguel
  Testing: Miguel
 -->
<script>
  import TableMenu from '$lib/menus/TableMenu.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let selected = '';
  let data = null;

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const speciality = urlParams.get('speciality');
    if (speciality != null) {
      selected = speciality;
    }

    let response = await api.get('process/list');
    if (response.ok) {
      data = (await response.json())['list'];
      console.log(data);
    } else {
      alert('Erro ao obter processos');
    }
  });
</script>

{#if data != null}
  <TableMenu
    {data}
    id="processId"
    add={true}
    search={['therapistListing', 'patients', 'refCode', 'processId']}
    select="speciality"
    {selected}
    check="active"
  />
{/if}
