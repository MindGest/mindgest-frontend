<script>
  import Avatar from "$lib/components/Avatar.svelte";
  import Button from "$lib/components/Button.svelte";
  import DatePicker from "$lib/components/DatePicker.svelte";
  import TextBox from "$lib/components/TextBox.svelte";
  import TextDisplay from "$lib/components/TextDisplay.svelte";
  import { uploadProfilePicture, parseDate, reverseParseDate } from "$lib/utils/util";

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
    
  function editUser() {
      data.name = document.getElementById("name").value
      data.birth_date = reverseParseDate(document.getElementById("birth_date").value)
      data.address = document.getElementById("address").value
      data.phone_number = document.getElementById("phone_number").value
      data.email = document.getElementById("email").value
      
      //TODO: Save "data" object to DB
  }

</script>


<div class="m-10 flex items-stretch">
    <div class="w-1/3 grid justify-items-center">
        <Avatar id="avatar" src="{data.photo}" class="w-2/3 "/>
        <input id="changeImage" type="file" accept="image/png, image/gif, image/jpeg" alt="logo" on:change={uploadProfilePicture("avatar")} style="display:none" />
        <label style="cursor: pointer; cursor: hand;" class="underline text-orange-500" for="changeImage">Editar foto de perfil</label>
    </div>
    <div class="w-2/3">
        <div class="my-5">
          <TextBox id="name" label="Nome:" value={data.name} class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
          <TextDisplay id="role" label="Função:" value="{data.role}" class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
            <DatePicker id="birth_date" label="Data de Nascimento:" value="{parseDate(data.birth_date)}" class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
          <TextBox id="address" label="Morada:" value={data.address} class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
          <TextBox id="phone_number" label="Contacto Telefónico:" value={data.phone_number} class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5">
          <TextDisplay id="email" label="Email:" value="{data.email}" class="grid grid-cols-4 items-center font-bold"/>
        </div>
        <div class="my-5 grid grid-cols-2">
            <Button class="mt-10 " on:click={editUser}>Guardar Alterações</Button>
        </div>
    </div>
</div>