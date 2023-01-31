<script>
  import { onMount } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import * as api from '$lib/utils/api';
  import Details from '$lib/components/Details.svelte';
  import Title from '$lib/components/Title.svelte';

  let paymentId = '';
  let data = {};

  onMount(async () => {
    paymentId = window.location.href.split('/').pop();
    data = await getPaymentData(paymentId);
  });

  async function getPaymentData(id) {
    // TODO: Integração

    const response = await api.get(`receipts/info/${id}`);

    if (response.ok) {
      let json = await response.json();
      if (json['paid']) {
        json.estado = 'Pago';
      } else {
        json.estado = 'Por Pagar';
      }
      return json;
    }
  }

  async function updatePaymentStatus(payed) {
    // TODO: Integração BD
    // payed: False -> Desmarcar como pago
    //        True  -> Marcar como pago
    if (payed) {
      data.estado = 'Pago';
    } else {
      data.estado = 'Por Pagar';
    }

    const response = await api.put(`receipts/pay/${paymentId}`);

    if (response.ok) {
      //TODO: MOSTRAR ALGO
    } else {
      //TODO: MOSTRAR ALGO
    }
  }

  data = {
    name: 'João Silva',
    tax_number: '123456789',
    sns: '123456789',
    address: 'Rua da Alegria, 123',
    email: 'joao@gmail.com',
    responsavel: 'João Silva',
    estado: 'Por Pagar',
    data: '2021-01-01'
  };

  console.log(data);
</script>

<Title text="appointment details [{paymentId}]" />
<Details class="mt-5" {data} />
<div class="mt-2 font-bold text-red-500">Valor Total: {data.custo} €</div>
<div class="mx-40 grid grid-cols-2">
  <Button class="m-5" text="Voltar" />
  {#if data.estado == 'Pago'}
    <Button class="m-5" text="Desmarcar como Pago" on:click={() => updatePaymentStatus(false)} />
  {:else}
    <Button class="m-5" text="Marcar como Pago" on:click={() => updatePaymentStatus(true)} />
  {/if}
</div>
