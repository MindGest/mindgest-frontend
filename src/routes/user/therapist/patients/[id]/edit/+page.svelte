<script>
  import TextBox from '$lib/components/TextBox.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import Button from '$lib/components/Button.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import DatePicker from '$lib/components/DatePicker.svelte';
  import { text } from 'svelte/internal';

  //TODO: Get patient data from database
  //TODO: Have the "Guardar" button save the data to the database (right now it just redirects to the patient page)

  let type = [
    { text: 'Criança' },
    { text: 'Jovem/Adolescente' },
    { text: 'Adulto' },
    { text: 'Casal' },
    { text: 'Família' },
    { text: 'Idoso' }
  ];

  let patient = {
    name: 'João Silva',
    type: '',
    birth_date: '01/01/2000',
    address: 'Rua da Alegria, 1, 1234-567 Lisboa',
    phone_number: '912345678',
    nif: '123456789',
    healthcare_number: '123456789',
    health_insurance: '',
    email: '',
    observations: 'Observações sobre o paciente',

    responsable_relation: 'Pai',
    responsable_name: 'João Silva',
    responsable_phone_number: '912345678',
    responsable_email: '',

    marital_status: 'Solteiro',
    education_level: 'Ensino Secundário',
    occupation: 'Vendas',

    conj_name: 'Maria Silva',
    conj_birth_date: '01/01/2000',
    conj_email: '',
    conj_phone_number: '912345678',

    member: [
      {
        relation: 'Pai',
        name: 'João Silva',
        birth_date: '01/01/2000',
        email: '',
        phone_number: '912345678'
      }
    ]
  };

  function removeMember(index) {
    patient.member = [...patient.member.slice(0, index), ...patient.member.slice(index + 1)];
  }

  function addMember() {
    patient.member = [
      ...patient.member,
      {
        relation: '',
        name: '',
        birth_date: '',
        email: '',
        phone_number: ''
      }
    ];
  }
</script>

<div class="m-10 w-full items-stretch justify-self-center grid grid-cols-2">
  <div class="mt-10 w-full items-stretch justify-self-center grid">
    <div class="my-5">
      <Selector
        id="type"
        options={type}
        display_func={o => o.text}
        label="Tipo de Paciente:"
        bind:value={patient.type}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextBox label="Nome:" value={patient.name} class="grid grid-cols-3 items-center font-bold" />
    </div>
    <div class="my-5">
      <DatePicker
        label="Data de Nascimento:"
        value={patient.birth_date}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextBox
        label="Morada:"
        value={patient.address}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextBox
        label="Contacto Telefónico:"
        value={patient.phone_number}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextBox
        label="Email:"
        value={patient.email}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
  </div>

  <div class="m-10 h-auto w-full items-stretch justify-self-center">
    <a class="my-5 underline text-orange-500 content-end" href="./">Guardar</a>

    <div class="my-5">
      <TextBox label="NIF:" value={patient.nif} class="grid grid-cols-3 items-center font-bold" />
    </div>
    <div class="my-5">
      <TextBox
        label="Número Segurança Social:"
        value={patient.healthcare_number}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextBox
        label="Seguro de vida:"
        value={patient.health_insurance}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextArea
        label="Observações:"
        value={patient.observations}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
  </div>
</div>

<!--Specific type fields-->

<div class="m-10 w-full items-stretch justify-self-center">
  {#if patient.type.text == 'Jovem/Adolescente' || patient.type.text == 'Criança'}
    <div class="mt-10 w-full items-stretch justify-self-center grid border-t-4">
      <div class="my-5">
        <TextBox
          label="Relação com o Responsável:"
          value={patient.responsable_relation}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Nome do Responsável:"
          value={patient.responsable_name}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Contacto Telefónico do Responsável:"
          value={patient.responsable_phone_number}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Email do Responsável:"
          value={patient.responsable_email}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Nível de Educação:"
          value={patient.education_level}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Ocupação:"
          value={patient.occupation}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
    </div>
  {/if}
  {#if patient.type.text == 'Adulto'}
    <div class="mt-10 w-full items-stretch justify-self-center grid border-t-4">
      <div class="my-5">
        <TextBox
          label="Estado Civil:"
          value={patient.marital_status}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Nível de Educação:"
          value={patient.education_level}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Ocupação:"
          value={patient.occupation}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
    </div>
  {/if}

  {#if patient.type.text == 'Casal'}
    <div class="mt-10 w-full items-stretch justify-self-center grid border-t-4">
      <div class="my-5">
        <TextBox
          label="Nome do Cônjuge:"
          value={patient.conj_name}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <DatePicker
          label="Data de Nascimento do Cônjuge:"
          value={patient.conj_birth_date}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Contacto Telefónico do Cônjuge:"
          value={patient.conj_phone_number}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          label="Email do Cônjuge:"
          value={patient.conj_email}
          class="grid grid-cols-3 items-center font-bold"
        />
      </div>
    </div>
  {/if}

  {#if patient.type.text == 'Família'}
    <div class="mt-10 w-full items-stretch grid self-start content-start">
      {#each patient.member as member, index}
        <div class="border-t-4">
          <div class="mt-10 w-1/2">
            <div>
              <button
                class="self-end items-end justify-end place-self-end text-orange-500 underline"
                on:click={() => removeMember(index)}>Remover membro</button
              >
            </div>
            <div class="my-5">
              <TextBox
                label="Relação com o Utente:"
                value={member.relation}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
            <div class="my-5">
              <TextBox
                label="Nome do Membro:"
                value={member.name}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
            <div class="my-5">
              <DatePicker
                label="Data de Nascimento do Membro:"
                value={member.birth_date}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
            <div class="my-5">
              <TextBox
                label="Contacto Telefónico do Membro:"
                value={member.phone_number}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
            <div class="my-5">
              <TextBox
                label="Email do Membro:"
                value={member.email}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
          </div>
        </div>
      {/each}
      <div class="w-1/2">
        <Button id="add_member" on:click={addMember}>Adicionar membro</Button>
      </div>
    </div>
  {/if}
</div>
