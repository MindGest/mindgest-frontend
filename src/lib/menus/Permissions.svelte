<!--
    Frontend: Miguel
    Integração: Gabriel
    Testado: Miguel

    Aplicado em:
        - /user/admin/records/[id]/edit/permissions 
        - /user/therapist/records/[id]/edit/permissions 
 -->
<script>
  import CalendarAccount from 'svelte-material-icons/CalendarAccount.svelte';
  import Eye from 'svelte-material-icons/Eye.svelte';
  import Pencil from 'svelte-material-icons/Pencil.svelte';
  import ChartBar from 'svelte-material-icons/ChartBar.svelte';
  import AccountCircle from 'svelte-material-icons/AccountCircle.svelte';
  import Folder from 'svelte-material-icons/Folder.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Button from '$lib/components/Button.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import * as api from '$lib/utils/api';
  import Title from '$lib/components/Title.svelte';
  import { StatusCodes } from 'http-status-codes';

  const size = 40;

  let processId;
  let interns = [];

  onMount(async () => {
    processId = parseInt(
      window.location.href.split('/')[window.location.href.split('/').length - 3]
    );

    let response = await api.post('permissions/get-interns-permissions', { processId: processId });
    if (response.ok) {
      let json = await response.json();
      interns = json['data'];
      console.log(interns);
    } else {
      alert('Erro ao carregar permissões dos estagiários');
    }
  });

  async function updatePermissions() {
    // iterate the interns of the process
    let responses = [];
    for (let i = 0; i < interns.length; i++) {
      // create the json with the required info
      let body = {
        collaboratorId: interns[i].collaboratorId, // id of the intern
        appoint: interns[i].appoint,
        statitics: interns[i].statistics,
        editProcess: interns[i].editprocess,
        editPatient: interns[i].editpatient,
        archive: interns[i].archive,
        see: interns[i].see,
        processId: processId
      };

      // call the endpoint and pass a json with the permissions of the user
      let response = await api.put(`permissions/edit-intern-permissions`, body);
      responses.push(response);
    }

    if (responses.filter(x => x.status === StatusCodes.OK).length == responses.length) {
      alert('Sucesso: Permissões Atualizadas');
    } else {
      alert('Erro ao atualizar permissões');
    }
  }
</script>

{#if interns != []}
  <Title text="Lista de estagiários associados ao processo" class="text-center" />
  <div class="m-10 grid grid-cols-7 justify-items-center">
    <p class="m-auto">Estagiário</p>
    <div class="grid grid-rows-2 justify-items-center">
      <CalendarAccount {size} />
      <h1>Agendar Consulta</h1>
    </div>
    <div class="grid grid-rows-2 justify-items-center">
      <Eye {size} />
      <h1>Ver processo</h1>
    </div>
    <div class="grid grid-rows-2 justify-items-center">
      <Pencil {size} />
      <h1>Editar Processo</h1>
    </div>
    <div class="grid grid-rows-2 justify-items-center">
      <ChartBar {size} />
      <h1>Estatísticas</h1>
    </div>
    <div class="grid grid-rows-2 justify-items-center">
      <Folder {size} />
      <h1>Arquivar</h1>
    </div>
  </div>

  {#each interns as intern}
    <div class="m-10 grid grid-cols-7 justify-items-center">
      <div>
        <h1 class="break-all">[E-{intern.collaboratorId}] {intern.name}</h1>
      </div>
      <Checkbox class="ml-2" bind:checked={intern.appoint} />
      <Checkbox class="ml-2" bind:checked={intern.see} />
      <Checkbox class="ml-2" bind:checked={intern.editprocess} />
      <Checkbox class="ml-2" bind:checked={intern.statistics} />
      <Checkbox class="ml-2" bind:checked={intern.archive} />
    </div>
  {/each}

  <div class="grid grid-cols-2">
    <Button
      class="mx-16 my-20"
      text="Voltar ao Processo"
      on:click={() =>
        goto(
          window.location.href
            .split('/')
            .slice(0, window.location.href.split('/').length - 2)
            .join('/')
        )}
    />
    <Button class="mx-16 my-20" text="Gravar" on:click={async () => await updatePermissions()} />
  </div>
{/if}
