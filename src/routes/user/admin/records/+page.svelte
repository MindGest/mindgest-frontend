<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/menus/TableMenu.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let selected = '';
  let data = [];

  onMount(async () => {
    // Redirect from /user/therapist/services
    const urlParams = new URLSearchParams(window.location.search)
    const speciality = urlParams.get("speciality")
    if (speciality != null) {
      selected = speciality;
    }

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

{#if data != []}
  <TableMenu
    {data}
    id="id"
    add={true}
    search={['therapistListing', 'patientName', 'refCode']}
    select="speciality"
    {selected}
    check="active"
  />
{/if}
