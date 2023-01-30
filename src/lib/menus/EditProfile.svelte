<script>
  import Avatar from '$lib/components/Avatar.svelte';
  import Button from '$lib/components/Button.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  // import TextDisplay from '$lib/components/TextDisplay.svelte';
  import {
    uploadProfilePicture,
    parseDate,
    reverseParseDate,
    requestProfileInfo
  } from '$lib/utils/util';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  export let infoRequestURL = 'user/profile/info';
  export let updateRequestURL = 'user/profile/info';
  export let imgRequestURL = 'user/profile/picture';

  let data = {};

  onMount(async () => {
    data = await requestProfileInfo(infoRequestURL, imgRequestURL);
    console.log(data);
  });

  async function editUser() {
    let body = {
      name: document.getElementById('Nome').value,
      address: document.getElementById('Morada').value,
      birthDate: reverseParseDate(document.getElementById('Data de Nascimento').value),
      phoneNumber: parseInt(document.getElementById('Contacto Telefónico').value),
      taxNumber: document.getElementById('NIF').value,
      email: data.email,
      password: '_null'
    };
    const response = await api.put(updateRequestURL, body);
    if (response.ok) {
      alert('Perfil Editado com sucesso');
    } else {
      alert('Erro ao atualizar o Perfil');
    }
  }
</script>

<div class="m-10 flex items-stretch">
  <div class="w-1/3 grid grid-rows-2 m-auto justify-items-center">
    <Avatar id="avatar" src={data.photo} class="w-2/3 my-5" />
    <input
      id="changeImage"
      type="file"
      accept="image/png, image/gif, image/jpeg"
      alt="logo"
      on:change={uploadProfilePicture('avatar')}
      style="display:none"
    />
    <label
      style="cursor: pointer; cursor: hand;"
      class="underline text-orange-500"
      for="changeImage">Editar foto de perfil</label
    >
  </div>

  <div class="w-3/5">
    <TextBox label="Nome" value={data.name} class="my-5" />
    <TextBox
      label="Data de Nascimento"
      value={parseDate(data.birth_date)}
      class="my-5"
      type="date"
    />
    <TextBox label="Morada" value={data.address} class="my-5" />
    <TextBox label="Contacto Telefónico" value={data.phone_number} class="my-5" />
    <TextBox label="NIF" value={data.tax_number} class="my-5" />
    <Button class="mt-10" text="Guardar Alterações" on:click={editUser} />
  </div>
</div>
