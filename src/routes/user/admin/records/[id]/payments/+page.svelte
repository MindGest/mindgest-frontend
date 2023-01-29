<script>
  import TableMenu from '$lib/menus/TableMenu.svelte';
  // import * as api from '$lib/utils/api';
  // import { onMount } from 'svelte';

  // onMount(async () => {
  //   let process = window.location.href.split("/")[6];
  //   const response = await api.get(`process/appointments/${process}`);
  //   if (response.ok) {
  //     let jsonInfo = await response.json();
  //     data = jsonInfo['message'];
  //   }
  // });

  let payments = [
    { date: '2021-05-01', reference: '123456', amount: 'R$ 100,00', status: 'online' },
    { date: '2021-05-01', reference: '123456', amount: 'R$ 100,00', status: 'presencial' },
    { date: '2021-05-01', reference: '123456', amount: 'R$ 100,00', status: 'atraso' },
    { date: '2021-05-01', reference: '123456', amount: 'R$ 100,00', status: 'atraso' }
  ];
</script>

<TableMenu data={payments} id="status" add={false} search={['reference']} check="status" />
