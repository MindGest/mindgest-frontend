<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/components/TableMenu.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let data = [];

  onMount(async () => {
    const response = await api.get('receipts/list', {});
    if (response.ok) {
      let json = await response.json();

      let jsonInfo = json['message'];
      data = jsonInfo; //TODO: ISTO RETORNA BUE DADOS Q E PARA NA PAGINA SEGUINTE NAO TER DE DAR LOAD A ELES TODOS AGAIN, NSEI COMO EQ SE ESCONDE PORTANTO DO THAT

      return;
    }
    status = response.status;
  });
</script>

{#if data!=[]}
<TableMenu
  {data}
  object="payment"
  id="appointmentCode"
  add={false}
  search={['patientName', 'therapistListing', 'appointmentCode']}
  check="paid"
/>
{/if}
