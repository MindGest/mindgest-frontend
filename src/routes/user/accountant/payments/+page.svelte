<script>
  import { page } from '$app/stores';
  import TableMenu from '$lib/menus/TableMenu.svelte';
  import * as api from '$lib/utils/api';
  import { onMount } from 'svelte';
  
  let data = null;
  onMount(async () => {
      let response = await api.get(`receipt/list`);

      if (response.ok) {
          let payments = (await response.json())["data"];
          console.log(payments)
          payments.forEach(pay => {
              pay.datetime = pay.datetime.slice(0, 10)
          });
          data = payments
      } else {
          alert("Erro ao carregar pagamentos")
      }
  });

</script>

{#if data != null}
  <TableMenu {data} id="id" search={['name']} />
{/if}