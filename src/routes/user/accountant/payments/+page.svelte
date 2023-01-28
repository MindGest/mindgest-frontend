<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/menus/TableMenu.svelte';
  // import { onMount } from 'svelte';
  // import * as api from '$lib/utils/api';
  
  let data = [];

  // onMount(async () => {
  //   const response = await api.get('receipts/list', {});
  //   if (response.ok) {
  //     let json = await response.json();

  //     let jsonInfo = json['message'];
  //     data = jsonInfo; 
  //     return;
  //   }
  //   status = response.status;
  // });
</script>

<TableMenu
  {data}
  object="payment"
  id="appointmentCode"
  add={false}
  search={['patientName', 'therapistListing', 'appointmentCode']}
  check="paid",
/>