<!--
    Frontend: Miguel
    Integração: Gabriel e Pedro
    Testado: Miguel

    Aplicado em:
        - /user/admin/profile
        - /user/therapist/profile
        - /user/guard/profile
        - /user/accountant/profile
        - /user/intern/profile
 -->
<script>
  import Avatar from '$lib/components/Avatar.svelte';
  import Button from '$lib/components/Button.svelte';
  import TextDisplay from '$lib/components/TextDisplay.svelte';
  import translate from '$lib/utils/translate';
  import { requestProfileInfo } from '$lib/utils/util';
  import { onMount } from 'svelte';
  import * as api from "$lib/utils/api";
  import { goto, invalidate } from '$app/navigation';
  import { redirect } from '@sveltejs/kit';

  export let self = true;
  export let id = null;
  export let role;
  export let isAdmin = false;

  const INTERN = 'intern';
  const THERAPIST = 'therapist';

  let data = null;
  
    onMount(async () => {
      if (self || id == null) {
        data = await requestProfileInfo('user/profile/info', 'user/profile/picture');
        if (data != null) {
          data.role = role
        }
      } else {
        data = await requestProfileInfo(`user/${id}/profile/info`, `user/${id}/profile/picture`);
      }
      
    });

    async function toAdmin() {
      let response = await api.put("user/profile/switch-view");
      if (response.ok) {
        goto("/")
      } else {
        alert("Erro ao trocar para conta de admin")
      }
    }
  </script>

{#if data != null}
  <div class="flex flex-line">
    <div class="w-1/3 grid grid-rows-3 m-auto justify-items-center p-10">
      <Avatar id="avatar" src={data.photo} class="w-2/3 my-5 p-2" />
      <a class="my-5 underline text-orange-500" href="{self ? "profile/edit": `${id}/edit`}">Editar perfil</a>
    </div>

    <div class="w-1/3 flex flex-col">
      <TextDisplay class="w-2/3 my-2" label="Nome" value={data.name} />
      <TextDisplay class="w-2/3 my-2" label="Função" value={translate(data.role)} />
      <TextDisplay
        class="w-2/3 my-2"
        label="Data de nascimento"
        value={data.birthDate.slice(0, 10)}
      />
      <TextDisplay class="w-2/3 my-2" label="Morada" value={data.address} />
      <TextDisplay class="w-2/3 my-2" label="Contacto Telefónico" value={data.phoneNumber} />
      <TextDisplay class="w-2/3 my-2" label="Email" value={data.email} />
    </div>

    <div class="w-1/3 flex flex-col">
      {#if data.role != INTERN}
        <TextDisplay class="w-2/3 my-2" label="NIF" value={data.taxNumber} />
      {/if}

      {#if data.role == THERAPIST}
        <TextDisplay class="w-2/3 my-2" label="Cédula OPP" value={data.license} />
        <TextDisplay class="w-2/3 my-2" label="Especialidade" value={data.speciality} />
        <TextDisplay class="w-2/3 my-2" label="Sistema de Saúde" value={data.healthSystem} />
        <TextDisplay class="w-2/3 my-2" label="Externo" value={data.extern ? 'Sim' : 'Não'} />
      {/if}
      {#if data.role == THERAPIST && isAdmin}
        <Button class="w-2/3 my-10" text="Ir para conta de Administrador" on:click={toAdmin}/>
      {/if}
    </div>
  </div>
{/if}
