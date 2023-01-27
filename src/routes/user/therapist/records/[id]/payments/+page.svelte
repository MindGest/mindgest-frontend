<script>
    import TableMenu from "$lib/components/TableMenu.svelte";

    const data = [
        {data: '15/06/2022', estado: 'Pago', referencia: '987654321', valor: '30'},
        {data: '22/06/2022', estado: 'Em Processamento', referencia: '', valor: '30'},
        {data: '23/06/2022', estado: 'Por Pagar', referencia: '', valor: '30'}
    ]
</script>

<TableMenu
  {data}
  object="payment"
  id="recordPayment"
  add={false}
  search={['referencia', 'data']}
/>