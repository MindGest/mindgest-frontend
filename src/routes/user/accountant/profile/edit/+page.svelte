<script>
  import Avatar from '$lib/components/Avatar.svelte';
  import Button from '$lib/components/Button.svelte';
  import DatePicker from '$lib/components/DatePicker.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import TextDisplay from '$lib/components/TextDisplay.svelte';
  import { uploadProfilePicture, parseDate, reverseParseDate } from '$lib/utils/util';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  const UNDEFINED = 'OHMANINHOQUERESPORRADA??!!??!!??';
  let data = {};

  onMount(async () => {
    const response = await api.get('user/profile/info', {});
    if (response.ok) {
      let json = await response.json();

      let jsonInfo = json['info'];

      let name = jsonInfo['name'];
      let email = jsonInfo['email'];
      let id = jsonInfo['id'];
      let address = jsonInfo['address'];
      let birth_date = jsonInfo['birth_date'];
      let photo = jsonInfo['photo'];
      let phone_number = jsonInfo['phone_number'];
      let tax = jsonInfo['tax_number'];

      const response2 = await api.get('user/profile/picture', {});
      if (response2.ok) {
        const blob = await response2.blob();
        const objectURL = URL.createObjectURL(blob);

        const img = document.getElementById('avatar');
        img.src = objectURL;
      }

      data = {
        name: name,
        id: id,
        birth_date: birth_date.replace(/^(\d{4})-(\d{2})-(\d{2})T.*Z$/, '$3/$2/$1'),
        address: address,
        email: email,
        phone_number: phone_number,
        tax: tax,
        role: 'Contabilista' //Talvez mudar isto, depende se for para fazer um geral ou n
      };

      return;
    }
    status = response.status;
  });

  async function editUser() {
    data.name = document.getElementById('name').value;
    data.birth_date = reverseParseDate(document.getElementById('birth_date').value);
    let newDate = new Date(data.birth_date.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1'))
      .toISOString()
      .slice(0, 10);
    data.address = document.getElementById('address').value;
    data.phone_number = document.getElementById('phone_number').value;
    let phoneNumber = parseInt(data.phone_number);
    data.email = document.getElementById('email').value;
    //TODO: Save "data" object to DB
    let body = {
      name: data.name,
      birthDate: newDate,
      address: data.address,
      phoneNumber: phoneNumber,
      email: data.email,
      taxNumber: data.tax,
      password: UNDEFINED
    };

    const response = await api.put('user/profile/info', body);
    if (response.ok) {
      //TODO: FAZER ALGO A DIZER Q FOI MODIFICADO
    } else {
      //TODO: FAZER CENA A DIZER Q HOUVE ERRO
    }
  }
</script>

{#if data != {}}
  <div class="m-10 flex items-stretch">
    <div class="w-1/3 grid justify-items-center">
      <Avatar id="avatar" src={data.photo} class="w-2/3 " />
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
    <div class="w-2/3">
      <div class="my-5">
        <TextBox
          id="name"
          label="Nome:"
          value={data.name}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextDisplay
          id="role"
          label="Função:"
          value={data.role}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <DatePicker
          id="birth_date"
          label="Data de Nascimento:"
          value={parseDate(data.birth_date)}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          id="address"
          label="Morada:"
          value={data.address}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextBox
          id="phone_number"
          label="Contacto Telefónico:"
          value={data.phone_number}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5">
        <TextDisplay
          id="email"
          label="Email:"
          value={data.email}
          class="grid grid-cols-4 items-center font-bold"
        />
      </div>
      <div class="my-5 grid grid-cols-2">
        <Button class="mt-10 " on:click={editUser}>Guardar Alterações</Button>
      </div>
    </div>
  </div>
{/if}
