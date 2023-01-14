<script>
  import Avatar from "$lib/components/Avatar.svelte";
  import TextDisplay from "$lib/components/TextDisplay.svelte";
  import { uploadProfilePicture } from "$lib/utils/util";
  import { onMount } from "svelte";
  import * as api from '$lib/utils/api';

  //TODO: Integração
  // Fiz a foto com url pq não tinha a certeza, mas depois diz me como queres que eu facilmente altero
    let data = {};

    onMount(async () => {
		const response = await api.get('user/profile/info', {}, );
    if (response.ok) {
        let json = await response.json();

        let jsonInfo = json["info"];
        
        let name = jsonInfo["name"];
        let email = jsonInfo["email"];
        let id = jsonInfo["id"];
        let address = jsonInfo["address"];
        let birth_date = jsonInfo["birth_date"];
        let photo = jsonInfo["photo"];
        let phone_number = jsonInfo["phone_number"];
        let tax = jsonInfo["tax_number"];

        const response2 = await api.get('user/profile/picture', {}, );
        if (response2.ok) {
          const blob = await response2.blob();
          const objectURL = URL.createObjectURL(blob);

          const img = document.getElementById("avatar");
          img.src = objectURL;
        }

        data = {
          "name": name,
          "id": id,
          "birth_date": birth_date.replace(/^(\d{4})-(\d{2})-(\d{2})T.*Z$/, "$3/$2/$1"),
          "address": address,
          "email": email,
          "phone_number":phone_number,
          "role": "Contabilista", //Talvez mudar isto, depende se for para fazer um geral ou n
        }
        
        return;
    }
    status = response.status;
	});

</script>

<div class="m-10 flex items-stretch">
    <div class="w-1/3 grid justify-items-center">
        <Avatar id="avatar" src="{data.photo}" class="w-2/3 "/>
        <input id="changeImage" type="file" accept="image/png, image/gif, image/jpeg" alt="logo" on:change={uploadProfilePicture("avatar")} style="display:none" />
        <label style="cursor: pointer; cursor: hand;" class="underline text-orange-500" for="changeImage">Editar foto de perfil</label>
    </div>
    <div class="w-2/3">
        <div class="my-5">
          <TextDisplay label="Nome:" value={data.name} class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
          <TextDisplay label="Função:" value="{data.role}" class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
            <TextDisplay label="Data de Nascimento:" value="{data.birth_date}" class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
          <TextDisplay label="Morada:" value={data.address} class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
          <TextDisplay label="Contacto Telefónico:" value={data.phone_number} class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
          <TextDisplay label="Email:" value="{data.email}" class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5 grid grid-cols-2">
            <a class="my-5 underline text-orange-500" href="profile/edit">Editar perfil</a>
        </div>
    </div>
</div>