<script>
    import TableMenu from "$lib/menus/TableMenu.svelte";
    import * as api from '$lib/utils/api';
    import { onMount } from 'svelte';

    let data = []

    onMount(async () => {
      let process = window.location.href.split("/")[6];
      const response = await api.get(`process/appointments/${process}`);
      if (response.ok) {
        let jsonInfo = await response.json();
        data = jsonInfo['message'];
      }
    });
</script>

{#if data!=[]}
<TableMenu
  {data}
  object="payment"
  id="recordPayment"
  add={false}
  search={['referencia', 'data']}
/>
{/if}