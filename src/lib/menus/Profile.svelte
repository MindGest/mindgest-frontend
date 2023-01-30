<script>
    import Avatar from '$lib/components/Avatar.svelte';
    import TextDisplay from '$lib/components/TextDisplay.svelte';
    import translate from '$lib/utils/translate';
    import {requestProfileInfo} from '$lib/utils/util';
    import { onMount } from 'svelte';
    
    export let self = true;
    export let id = null;
    export let role;

    const INTERN = "intern"
    const THERAPIST = "therapist"
    const GUARD = "guard"
    const ADMIN = "admin"
    const ACCOUNTANT = "accountant"

    let data = null;

    
    onMount(async () => {
      if (self || id == null) {
        data = await requestProfileInfo('user/profile/info', 'user/profile/picture');
        data.role = role
      } else {
        data = await requestProfileInfo(`user/${id}/profile/info`, `user/${id}/profile/picture`);
      }
    });

  </script>

{#if data != null}
  <div class="flex flex-line">
    
    <div class="w-1/3 grid grid-rows-2 m-auto justify-items-center p-10">
      <Avatar id="avatar" src={data.photo} class="w-2/3 my-5 p-2" />
      <a class="my-5 underline text-orange-500" href="profile/edit">Editar perfil</a>
    </div>
    
    <div class="w-2/3 flex flex-col">
      <TextDisplay class="w-1/2 my-2" label="Nome" value={data.name}/>
      <TextDisplay class="w-1/2 my-2" label="Função" value={translate(data.role)}/>
      <TextDisplay class="w-1/2 my-2" label="Data de nascimento" value={data.birthDate} />
      <TextDisplay class="w-1/2 my-2" label="Morada" value={data.address}/>
      <TextDisplay class="w-1/2 my-2" label="Contacto Telefónico" value={data.phoneNumber}/>
      <TextDisplay class="w-1/2 my-2" label="Email" value={data.email}/>

      {#if data.role != INTERN}
        <TextDisplay class="w-1/2 my-2" label="NIF" value={data.taxNumber}/>
      {/if}
      
      {#if data.role == THERAPIST}
        <TextDisplay label="Cédula OPP" class="my-5" value={data.license}/>
        <TextDisplay label="Especialidade" class="my-5" value={data.specialty}/>
      {/if}
    </div>
  </div>
{/if}