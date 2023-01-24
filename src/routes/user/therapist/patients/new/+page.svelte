<script>
  import Button from '$lib/components/Button.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';
  import Selector from '$lib/components/Selector.svelte';

  let type = [
    { text: 'Criança' },
    { text: 'Jovem/Adolescente' },
    { text: 'Adulto' },
    { text: 'Casal' },
    { text: 'Família' },
    { text: 'Idoso' }
  ];

  let patient = {
    type: '',
    name: '',
    birthday: '',
    address: '',
    nif: '',
    finance: '',
    healthcare: '',
    healthcareRef: '',
    family: '',
    motive: '',
    obs: '',
    disp: '',

    schoolYear: '',
    fatherTelf: '',
    fatherName: '',
    fatherEmail: '',
    motherTelf: '',
    motherName: '',
    motherEmail: '',

    otherTelf: '',
    otherName: '',
    otherEmail: '',

    telf: '',
    email: '',
    status: '',
    level: '',
    prof: '',
    conjName: '',
    conjBirthday: '',
    conjTelf: '',
    conjEmail: ''
  };

  onMount(async () => {
    /* help */
  });

  async function addProcess() {
    /* help */
  }
</script>

<div class="flex flex-col justify-center h-auto w-5/6 m-10 p-5 items-stretch">
  <p class="font-normal text-xl">Novo Utente</p>
  <div class="flex flex-col w-full items-stretch">
    <Selector
      id="type"
      label="Selecione o tipo de paciente:"
      options={type}
      display_func={o => o.text}
      bind:value={patient.type}
      class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
      id="name"
      label="Nome:"
      bind:value={patient.name}
      class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
      id="birthday"
      label="Data de Nascimento:"
      bind:value={patient.birthday}
      class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
      id="address"
      label="Morada:"
      bind:value={patient.address}
      class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
      id="nif"
      label="NIF:"
      bind:value={patient.nif}
      class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
      id="finance"
      label="Situação Financeira:"
      bind:value={patient.finance}
      class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
      id="healthcare"
      label="Sistema de Saúde (opcional):"
      bind:value={patient.healthcare}
      class="grid grid-cols-4 items-center font-bold"
    />
    {#if patient.healthcare.length > 1}
      <TextBox
        id="healthcareRef"
        label="Referência:"
        bind:value={patient.healthcareRef}
        class="grid grid-cols-4 items-center font-bold"
      />
    {/if}
    <TextBox
      id="family"
      label="Agregado Familiar:"
      bind:value={patient.family}
      class="grid grid-cols-4 items-center font-bold"
    />

    {#if patient.type.text === 'Criança' || patient.type.text === 'Jovem/Adolescente'}
      <TextBox
        id="schoolYear"
        label="Ano Escolar:"
        bind:value={patient.schoolYear}
        class="grid grid-cols-4 items-center font-bold"
      />
      <p class="font-normal text-xl">Pai</p>
      <TextBox
        id="fatherName"
        label="Nome do Pai:"
        bind:value={patient.fatherName}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="fatherTelf"
        label="Contacto Telefónico:"
        bind:value={patient.fatherTelf}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="fatherEmail"
        label="Email do Pai:"
        bind:value={patient.fatherEmail}
        class="grid grid-cols-4 items-center font-bold"
      />
      <p class="font-normal text-xl">Mãe</p>
      <TextBox
        id="motherName"
        label="Nome da Mãe:"
        bind:value={patient.motherName}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="motherTelf"
        label="Contacto Telefónico:"
        bind:value={patient.motherTelf}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="motherEmail"
        label="Email da Mãe:"
        bind:value={patient.motherEmail}
        class="grid grid-cols-4 items-center font-bold"
      />
      <p class="font-normal text-xl">Outro Responsável</p>
      <TextBox
        id="otherName"
        label="Nome:"
        bind:value={patient.otherName}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="otherTelf"
        label="Contacto Telefónico:"
        bind:value={patient.otherTelf}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="otherEmail"
        label="Email:"
        bind:value={patient.otherEmail}
        class="grid grid-cols-4 items-center font-bold"
      />
    {/if}

    {#if patient.type.text === 'Adulto' || patient.type.text === 'Casal' || patient.type.text === 'Família' || patient.type.text === 'Idoso'}
      <TextBox
        id="telf"
        label="Contacto Telefónico:"
        bind:value={patient.telf}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="email"
        label="Email:"
        bind:value={patient.email}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="status"
        label="Estado Civil:"
        bind:value={patient.status}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="level"
        label="Nível Escolar:"
        bind:value={patient.level}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="prof"
        label="Ocupação/Profissão:"
        bind:value={patient.prof}
        class="grid grid-cols-4 items-center font-bold"
      />
      <p class="font-normal  text-xl">Responsável</p>
      <TextBox
        id="otherName"
        label="Nome:"
        bind:value={patient.otherName}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="otherTelf"
        label="Contacto Telefónico:"
        bind:value={patient.otherTelf}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="otherEmail"
        label="Email:"
        bind:value={patient.otherEmail}
        class="grid grid-cols-4 items-center font-bold"
      />
    {/if}

    {#if patient.type.text === 'Casal' || patient.type.text === 'Família'}
      {#if patient.type.text === 'Casal'}
        <p class="font-normal text-xl">Cônjuge</p>
      {/if}
      {#if patient.type.text === 'Família'}
        <p class="font-normal text-xl">Membro</p>
      {/if}

      <TextBox
        id="conjName"
        label="Nome:"
        bind:value={patient.conjName}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="conjBirthday"
        label="Data de Nascimento:"
        bind:value={patient.conjBirthday}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="conjTelf"
        label="Contacto Telefónico:"
        bind:value={patient.conjTelf}
        class="grid grid-cols-4 items-center font-bold"
      />
      <TextBox
        id="conjEmail"
        label="Email:"
        bind:value={patient.conjEmail}
        class="grid grid-cols-4 items-center font-bold"
      />

      <!-- não sei bem como adicionar um novo membro iterativamente (aka ter um botão que vai adicionando membros conforme se quer) -->
    {/if}

    <TextBox
      id="motive"
      label="Motivo do pedido:"
      bind:value={patient.motive}
      class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
      id="obs"
      label="Outras Observações:"
      bind:value={patient.obs}
      class="grid grid-cols-4 items-center font-bold"
    />
    <TextBox
      id="disp"
      label="Disponibilidade:"
      bind:value={patient.disp}
      class="grid grid-cols-4 items-center font-bold"
    />
  </div>
  <div class="my-5 grid grid-cols-2">
    <Button class="mt-10 " on:click={addProcess}>Enviar pedido de novo processo</Button>
  </div>
</div>
