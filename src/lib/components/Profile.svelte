<script>
    import Avatar from '$lib/components/Avatar.svelte';
    import TextDisplay from '$lib/components/TextDisplay.svelte';
    import {requestProfileInfo} from '$lib/utils/util';
    import { onMount } from 'svelte';

    
    export let role;
    export let infoRequestURL = 'user/profile/info';
    export let imgRequestURL = 'user/profile/picture';
    
    let data = {};
  
    onMount(async () => { data = await requestProfileInfo(infoRequestURL, imgRequestURL);});

  </script>
  
  <div class="m-10 flex items-stretch">
    <div class="w-1/3 grid grid-rows-2 m-auto justify-items-center">
      <Avatar id="avatar" src={data.photo} class="w-2/3 my-5" />
      <a class="my-5 underline text-orange-500" href="profile/edit">Editar perfil</a>
    </div>

    <div class="w-2/3">
      <div class="my-5">

        <TextDisplay
          label="Nome:"
          value={data.name}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextDisplay
          label="Função:"
          value={role}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextDisplay
          label="Data de Nascimento:"
          value={data.birth_date}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextDisplay
          label="Morada:"
          value={data.address}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextDisplay
          label="Contacto Telefónico:"
          value={data.phone_number}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextDisplay
          label="Email:"
          value={data.email}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextDisplay
        id="tax_number"
        label="NIF:"
        value={data.tax_number}
        class="grid grid-cols-4 items-center font-bold"
        />
    </div>
    </div>
  </div>