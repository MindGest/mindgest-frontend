<script>
  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Table from '$lib/components/Table.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let detailed = false;
  let status = 200;
  let info = [];
  let infoNotRelevant = [];
  let infoUtente = [];
  let infoFiltered = [];
  let infoNotRelevantFiltered = [];

  let payedChecked = true;
  let notPayedChecked = true;

  function toggle() {
    detailed = !detailed;
  }

  function detail(event) {
    console.log(event.detail.myData['Código da Consulta']);

    let i = event.detail.index;
    infoUtente = {
      fatura: infoFiltered[i]['Código da Consulta'],
      data: infoFiltered[i]['Dia da Consulta'],
      email: infoNotRelevantFiltered[i]['email'],
      name: infoFiltered[i]['Utente'],
      nif: infoNotRelevantFiltered[i]['nif'],
      sns: infoNotRelevantFiltered[i]['sns'],
      morada: infoNotRelevantFiltered[i]['morada'],
      responsavel: infoFiltered[i]['Responsável(eis)'],
      estado: infoNotRelevantFiltered[i]['estado'],
      custo: infoNotRelevantFiltered[i]['custo']
    };
    toggle();
  }

  async function filter(label) {
    if (label === 'Pago') {
      payedChecked = !payedChecked;
    } else {
      notPayedChecked = !notPayedChecked;
    }

    let newInfoFiltered = [];
    let newNotRelevantInfoFiltered = [];
    for (var i = 0; i < info.length; i++) {
      if (
        (infoNotRelevant[i]['pago'] == true && payedChecked == true) ||
        (infoNotRelevant[i]['pago'] == false && notPayedChecked == true)
      ) {
        newInfoFiltered.push(info[i]);
        newNotRelevantInfoFiltered.push(infoNotRelevant[i]);
      }
    }
    infoFiltered = newInfoFiltered;
    newNotRelevantInfoFiltered = newNotRelevantInfoFiltered;
  }

  async function filtertText(label) {
    if (label === '') {
      infoFiltered = info;
      infoNotRelevantFiltered = infoNotRelevant;
    } else {
      let newInfoFiltered = [];
      let newNotRelevantInfoFiltered = [];
      for (var i = 0; i < info.length; i++) {
        if (
          (infoNotRelevant[i]['pago'] == true && payedChecked == true) ||
          (infoNotRelevant[i]['pago'] == false && notPayedChecked == true)
        ) {
          if (info[i]['Utente'].includes(label) || info[i]['Código da Consulta'].includes(label)) {
            newInfoFiltered.push(info[i]);
            newNotRelevantInfoFiltered.push(infoNotRelevant[i]);
          }
        }
      }
      infoFiltered = newInfoFiltered;
      newNotRelevantInfoFiltered = newNotRelevantInfoFiltered;
    }
  }

  onMount(async () => {
    const response = await api.get('receipts/list', {});
    if (response.ok) {
      let json = await response.json();

      let jsonInfo = json['message'];

      let infoHelper = [];
      for (var i = 0; i < jsonInfo.length; i++) {
        let date = jsonInfo[i]['date'];
        let dateInfo = date.split('T');
        let dateNumbers = dateInfo[0].split('-');
        let stringDate = `${dateNumbers[2]} de ${api.getMonth(dateNumbers[1])} de ${
          dateNumbers[0]
        }`;
        infoHelper.push({
          Utente: jsonInfo[i]['patientName'],
          'Responsável(eis)': jsonInfo[i]['mainTherapist'],
          'Código da Consulta': jsonInfo[i]['ref'],
          'Dia da Consulta': stringDate
        });
        infoNotRelevant.push({
          pago: jsonInfo[i]['pago'],
          custo: jsonInfo[i]['custo'],
          estado: jsonInfo[i]['estado'],
          email: jsonInfo[i]['email'],
          nif: jsonInfo[i]['nif'],
          sns: jsonInfo[i]['sns'],
          morada: jsonInfo[i]['morada']
        });
      }
      info = infoHelper;
      infoFiltered = info;
      infoNotRelevantFiltered = infoNotRelevant;
      return;
    }
    status = response.status;
  });
</script>

{#if detailed}
  <h1 class="text-4xl font-bold mx-40 my-10">Detalhes da Consulta</h1>
  <div class="mx-40 my-10">
    <div class="my-5">
      <bold class="font-bold">Nome do(a) Utente:</bold>
      {infoUtente.name}
    </div>
    <div class="my-5">
      <bold class="font-bold">NIF:</bold>
      {infoUtente.nif}
    </div>
    <div class="my-5">
      <bold class="font-bold">Número Sistema Saúde:</bold>
      {infoUtente.sns}
    </div>
    <div class="my-5">
      <bold class="font-bold">Morada Fiscal:</bold>
      {infoUtente.morada}
    </div>
    <div class="my-5">
      <bold class="font-bold">E-mail:</bold>
      {infoUtente.email}
    </div>
    <div class="my-5">
      <bold class="font-bold">Responsável:</bold>
      {infoUtente.responsavel}
    </div>
    <div class="my-5">
      <bold class="font-bold">Estado da Consulta:</bold>
      {infoUtente.estado}
    </div>
    <div class="my-5">
      <bold class="font-bold">Data da Consulta:</bold>
      {infoUtente.data}
    </div>
    <div class="my-16 font-bold text-red-500">Valor Total: {infoUtente.custo}</div>
  </div>

  <div class="mx-40 w-1/6">
    <Button on:click={toggle}>Voltar</Button>
  </div>
{:else}
  <div class="mx-20 my-10">
    <SearchBar placeholder="Pesquisa" filter={filtertText} />
    <div>
      <Checkbox label="Por pagar" checked={true} {filter} />
      <Checkbox label="Pago" checked={true} {filter} />
    </div>
  </div>
  {#if infoFiltered.length > 0}
    <div class="grid justify-items-center m-10">
      <div class="w-2/3">
        <Table data={infoFiltered} on:info={detail} />
      </div>
    </div>
  {/if}
{/if}
