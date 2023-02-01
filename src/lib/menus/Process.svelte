<!-- 
    Frontend: Rita/Miguel 
    Integration: Miguel e Gabriel
    Testing: ??

    Aplicado em:
        - /user/admin/records/[id]
        - /user/therapist/records/[id]
        - /user/intern/records/[id]
 -->
<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import TextDisplay from '$lib/components/TextDisplay.svelte';
  import Title from '$lib/components/Title.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  export let role;

  const INTERN = 'intern';

  let data = null;

  onMount(async () => {
    let processId = parseInt(window.location.href.split('/').slice(-1));
    let permissions = {};

    if (role == INTERN) {
      let responsePermissions = await api.post('permissions/get-intern-permissions', {
        processId: processId
      });
      if (responsePermissions.ok) {
        permissions = (await responsePermissions.json())['data'];
        if (!permissions.see) {
          alert('Não tem permissões para ver este processo');
          return;
        }
      } else {
        alert('Erro a carregar permissões do estagiário');
        return;
      }
    }

    let responseProcessData = await api.get(`process/${processId}/info`);
    let responseColaborators = await api.post('process/collaborators', { processId: processId });
    if (responseProcessData.ok && responseColaborators.ok) {
      let processData = await responseProcessData.json();
      let colaborators = (await responseColaborators.json())['data'];
      data = {
        role: role,
        processId: processId,

        patient: processData.utent,
        remarks: processData.remarks,
        status: processData.active,
        speciality: processData.speciality,
        responsavel: processData.therapistName,

        colaborators: colaborators
      };
      console.log(processData);
    } else {
      alert('Erro ao carregar processo');
    }
  });

  function formatTherapist(therapist) {
    return '[T-' + therapist.id + '] ' + therapist.name;
  }

  function formatIntern(intern) {
    return '[E-' + intern.id + '] ' + intern.name;
  }

  function seePay() {}

  function gotoNotes() {
    goto('/user/' + data.role + '/records/' + data.processId + '/notes');
  }

  function gotoAppointments() {
    goto('/user/' + data.role + '/appointments/');
  }

  function gotoPayments() {
    goto('/user/' + data.role + '/records/' + data.processId + '/payments');
  }

  function edit() {
    goto('/user/' + data.role + '/records/' + data.processId + '/edit');
  }

  function back() {
    goto('/user/' + data.role + '/records');
  }
</script>

{#if data != null}
  <div class="grid grid-cols-3">
    <div>
      <TextDisplay class="my-5 w-2/3 m-auto" label="Processo" value={data.processId} />
      <TextDisplay
        class="my-5 w-2/3 m-auto"
        label="Estado do Processo"
        value={data.status ? 'Ativo' : 'Não Ativo'}
      />
      <TextDisplay class="my-5 w-2/3 m-auto" label="Utente" value={data.patient} />
      <TextDisplay
        class="my-5 w-2/3 m-auto"
        label="Profissional Responsável"
        value={data.responsavel}
      />
      <TextDisplay class="my-5 w-2/3 m-auto" label="Especialidade" value={data.speciality} />
      <TextDisplay class="my-5 w-2/3 m-auto" label="Situação Financeira" />
    </div>

    <div>
      <Title class="text-center" text="Colaboradores" />
      {#each data.colaborators.therapists as therapist}
        <TextDisplay class="my-5 w-2/3 m-auto" value={formatTherapist(therapist)} />
      {/each}

      {#each data.colaborators.interns as intern}
        <TextDisplay class="my-5 w-2/3 m-auto" value={formatIntern(intern)} />
      {/each}
    </div>

    <div class="flex flex-col w-2/3 m-auto">
      <Button class="my-5" text="Ver Notas" on:click={gotoNotes} />
      <Button class="my-5" text="Ver Consultas" on:click={gotoAppointments} />
      <Button class="my-5" text="Ver Pagamentos" on:click={gotoPayments} />
      <Button class="my-5" text="Editar Processo" on:click={edit} />
      <Button class="my-5" text="Voltar ao Menu de Pesquisa" on:click={back} />
    </div>
  </div>
{/if}
