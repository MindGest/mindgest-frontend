<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/components/TableMenu.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let data = [];

  onMount(async () => {
    const response = await api.get('process/listTherapist', {});
    if (response.ok) {
      let json = await response.json();

      let jsonInfo = json['list'];
      data = jsonInfo; //SE EU RETORNAR O ATIVO NAO ATIVO DA MERDA QND TIVERES DADO FIX DIZ Q EU ALTERO NO BACKEND

      return;
    }
    status = response.status;
  });
</script>

{#if data!=[]}
<TableMenu
  {data}
  id="id"
  add={true}
  search={['therapistListing', 'patientName', 'refCode']}
  select="speciality"
  check="active"
/>
{/if}
