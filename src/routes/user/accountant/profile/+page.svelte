<script>
  import Avatar from "$lib/components/Avatar.svelte";
  import TextDisplay from "$lib/components/TextDisplay.svelte";
  import { uploadProfilePicture } from "$lib/utils/util";

  //TODO: Integração
  // Fiz a foto com url pq não tinha a certeza, mas depois diz me como queres que eu facilmente altero
    let data = {
        "name": "Miguel",
        "role": "Contabilista",
        "birth_date": "09/02/2000",
        "address": "str",
        "phone_number": "123456789",
        "email": "miguel@ola.ola",
        "photo": "https://imgix.ranker.com/list_img_v2/19409/2739409/original/memes-only-fans-of-the-office-will-understand-u1"
    };

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