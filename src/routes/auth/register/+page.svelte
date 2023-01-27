<script>
  import TextBox from '$lib/components/TextBox.svelte';
  import Button from '$lib/components/Button.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  let roles = ["Administrador", "Terapeuta", "Segurança", "Contabilidade", "Estagiário"];
  let option = "Administrador"


  let specialties = ["spec1", "spec2", "spec3"];

  let user = {
    "name": "",
    "birth_date" : "",
    "address": "",
    "phone_number": "",
    "email": "",
    "specialty": "",
    "tax_number": "",
    "license": "",
    "email": "",
    "password": "",
  };

  onMount(async () => {
    //TODO: get specialties
    // specialties = await getSpecialties()
  });

  async function register() {
    let body =  {
      "name": user.name,
      "birth_date": new Date(user.birth_date).toISOString(),
      "address": user.address,
      "phone_number": parseInt(user.phone_number),
      "email": user.email,
      "password": user.password,
    };

    if (option != "Estagiário") {
      body.tax_number = parseInt(user.tax_number)
    } 
    
    if (option == "Terapeuta") {
      body.specialty = user.specialty 
      body.license = parseInt(user.license)
    }
    
    //TODO: Integrate Register
    console.log(body);
  }

</script>

<div class="flex">
  <div class="grid grid-rows-2 justify w-full">
    <div>

      <h1 class="text-4xl mt-10 mx-10 my-5 text-orange-500">Registo</h1>
      <hr class="border-orange-500 mr-5 ml-10"/>
    </div>
    <div class="mx-10 mt-5">
      {#each roles as role, i}
        <input id={i} type="radio" name="choice" value={role} class="ml-16 mt-5 accent-orange-500" checked={ i == 0 } on:click={() => option = roles[i]}/>
        <label for="{i}">{role}</label>
      {/each}
    </div>
  </div>
  <img src="/img/logo.png" alt="logo" class="p-3 object-cover h-40 w-40 m-auto mr-10" />
</div>



<form on:submit|preventDefault={async () => { await register()}}>

  <div class="grid grid-cols-2">
    
    <div class="m-auto w-2/3"> 
      <TextBox label="Email" class="my-5" bind:value={user.email}/>
      <TextBox label="Password" class="my-5" type="password" bind:value={user.password}/>
      <TextBox label="Nome" class="my-5" bind:value={user.name}/>
      <TextBox label="Data de Nascimento" class="my-5" type="date" bind:value={user.birth_date}/>
      <TextBox label="Morada" class="my-5" bind:value={user.address}/>
      <TextBox label="Contacto Telefónico" class="my-5" bind:value={user.phone_number}/>
    </div>

    <div class="mx-auto w-2/3">
      <!-- NIF: All but intern -->
      {#if option != "Estagiário"}
      <TextBox label="NIF" class="my-5" bind:value={user.tax_number}/>
      {/if}
      
      <!-- Only Terapeuta -->
      {#if option == "Terapeuta"}
      <TextBox label="Cédula OPP" class="my-5" bind:value={user.license}/>
      <Selector label="Especialidade" class="my-5" bind:value={user.specialty} values={specialties}/>
      {/if}
    </div>
  </div>
  <div class="grid grid-cols-2">
    <Button class="mx-16 my-20 " text="Voltar" on:click={() => goto("/auth/login")}/>
    <Button class="mx-16 my-20 " text="Enviar pedido de Registo" type="submit" />
  </div>
</form>

