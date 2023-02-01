<script>
  import TextDisplay from '$lib/components/TextDisplay.svelte';
  import TextArea from '$lib/components/TextArea.svelte';

  let patient = {
    name: 'João Silva',
    type: 'Família',
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
</script>

<div class="w-5/6 items-stretch justify-self-center grid grid-cols-2">
  <div class="w-11/12 items-stretch justify-self-center grid">
    <div class="my-5">
      <TextDisplay
        label="Tipo de Paciente:"
        value={patient.type}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextDisplay
        label="Nome:"
        value={patient.name}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextDisplay
        label="Data de Nascimento:"
        value={patient.birth_date}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextDisplay
        label="Morada:"
        value={patient.address}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextDisplay
        label="Contacto Telefónico:"
        value={patient.phone_number}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextDisplay
        label="Email:"
        value={patient.email}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
  </div>

  <div class="m-10 h-auto w-full items-stretch justify-self-center">
    <a class="my-5 underline text-orange-500 content-end" href="[id]/edit">Editar utente</a>

    <div class="my-5">
      <TextDisplay
        label="NIF:"
        value={patient.nif}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextDisplay
        label="Número Segurança Social:"
        value={patient.healthcare_number}
        class="grid grid-cols-3 items-center font-bold"
      />
    </div>
    <div class="my-5">
      <TextDisplay
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

<div class="w-full items-stretch justify-self-center">
  {#if patient.type == 'Jovem/Adolescente' || patient.type == 'Criança'}
    <div class="w-full border-t-4">
      <div class="mx-10 w-1/2 items-stretch justify-self-center grid">
        <div class="my-5">
          <TextDisplay
            label="Relação com o Responsável:"
            value={patient.responsable_relation}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Nome do Responsável:"
            value={patient.responsable_name}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Contacto Telefónico do Responsável:"
            value={patient.responsable_phone_number}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Email do Responsável:"
            value={patient.responsable_email}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Nível de Educação:"
            value={patient.education_level}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Ocupação:"
            value={patient.occupation}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
      </div>
    </div>
  {/if}
  {#if patient.type == 'Adulto'}
    <div class="w-full border-t-4">
      <div class="m-10 w-1/2 items-stretch justify-self-center">
        <div class="my-5">
          <TextDisplay
            label="Estado Civil:"
            value={patient.marital_status}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Nível de Educação:"
            value={patient.education_level}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Ocupação:"
            value={patient.occupation}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
      </div>
    </div>
  {/if}

  {#if patient.type == 'Casal'}
    <div class="w-full border-t-4">
      <div class="mx-10 w-1/2 items-stretch justify-self-center grid">
        <div class="my-5">
          <TextDisplay
            label="Nome do Cônjuge:"
            value={patient.conj_name}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Data de Nascimento do Cônjuge:"
            value={patient.conj_birth_date}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Contacto Telefónico do Cônjuge:"
            value={patient.conj_phone_number}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
        <div class="my-5">
          <TextDisplay
            label="Email do Cônjuge:"
            value={patient.conj_email}
            class="grid grid-cols-3 items-center font-bold"
          />
        </div>
      </div>
    </div>
  {/if}

  {#if patient.type == 'Família'}
    <div class="mt-10 w-full items-stretch justify-self-center grid">
      {#each patient.member as member}
        <div class="border-t-4">
          <div class="w-1/2 m-10">
            <div class="my-5">
              <TextDisplay
                label="Relação com o Utente:"
                value={member.relation}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
            <div class="my-5">
              <TextDisplay
                label="Nome do Membro:"
                value={member.name}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
            <div class="my-5">
              <TextDisplay
                label="Data de Nascimento do Membro:"
                value={member.birth_date}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
            <div class="my-5">
              <TextDisplay
                label="Contacto Telefónico do Membro:"
                value={member.phone_number}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
            <div class="my-5">
              <TextDisplay
                label="Email do Membro:"
                value={member.email}
                class="grid grid-cols-3 items-center font-bold"
              />
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
