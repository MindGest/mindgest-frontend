<script>
	import Button from '$lib/components/button.svelte';
    import {push, pop, replace} from 'svelte-spa-router';
    import {goto} from '$app/navigation';
    import TextBox from '$lib/components/TextBox.svelte';
    import TextArea from '$lib/components/TextDisplay.svelte';
    import Avatar from '$lib/components/Avatar.svelte';
    import Selector from '$lib/components/Selector.svelte';

    //TODO: Add validation to email and password, save to database.

    let roles = [{text:'Terapeuta'}, {text:'Segurança'}, {text:'Contabilista'}];

    let person = {
        role: '',
        name: '',
        picture: '',
        birthday: '',
        adress: '',
        cellphone: '',
        tax_number: '',
        specialty: '',
        OPP: '',
        email: '',
        password: '',       
    }
    let password_validation = '';

    function onSubmit(){}
    
    

    //Funtion to update Profile Picture
    function onChange(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        person.picture = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

</script>
<div class="flex flex-row items-center justify-center w-full h-auto border-b-4 space-x-30">
    
    <div class="w-3/4 text-3xl font-sans  pl-2 pb-3">Registo</div>
    <img src="/logo.png" alt="logo" class="p-3 object-cover h-40 w-40" />
</div>

<div class="flex flex-row items-start justify-center w-full m-10 p-5">
    <div class="flex flex-col items-center justify-center w-3/6 h-auto m-10 p-5 text-xl font-sans">
        <div class="text-m m-12">Fotografia de perfil:</div>
        {#if person.picture}
            <Avatar src={person.picture} alt=''/>
        {:else}
            <Avatar src="/logo.png" alt=''/>
        {/if}
        <input class="m-5" type="file"  on:change={onChange} />
    </div>
    <div class="flex flex-col justify-center h-auto w-5/6 m-10 p-5 items-stretch">

        <form class="flex flex-col w-full items-stretch" on:submit={onSubmit}>
            <Selector id="role" label="Profissão:" options={roles} display_func={o => o.text} bind:value={person.role} class="grid grid-cols-4 items-center font-bold"/>
            <TextBox id="name" label="Nome:" bind:value={person.name} class="grid grid-cols-4 items-center font-bold"/>
            <TextBox id="birthday" label="Data de Nascimento:" bind:value={person.birthday} class="grid grid-cols-4 items-center font-bold"/>
            <TextBox id="phone_number" label="Número de Telemóvel:" bind:value={person.cellphone} class="grid grid-cols-4 items-center font-bold"/>
            <TextBox id="tax_number" label="NIF:" bind:value={person.tax_number} class="grid grid-cols-4 items-center font-bold"/>
            {#if person.role.text == "Terapeuta"}
                <TextBox id="specialty" label="Especialidade(s):" bind:value={person.specialty} class="grid grid-cols-4 items-center font-bold"/> <!--TODO: fazer um select com as especialidades ou guarda-se com "," (?)-->
                <TextBox id="opp" label="Cédula OPP:" bind:value={person.opp} class="grid grid-cols-4 items-center font-bold"/>
            {/if}
            <TextBox id="email" label="Email:" bind:value={person.email} class="grid grid-cols-4 items-center font-bold"/>
            <TextBox id="password" label="Password:" bind:value={person.password} class="grid grid-cols-4 items-center font-bold"/>
            <TextBox id="name" label="Confirme a sua password:" bind:value={password_validation} class="grid grid-cols-4 items-center font-bold"/>
        </form>
        <div class="flex flex-row w-3/6 m-10 p-5 items-center justify-center space-x-56">
            <a class="text-orange-500 red w-full py-2 outline outline-1 rounded text-center" href="login">Voltar ao Login</a>
            <Button>Registar</Button>
        </div>
    </div>
</div>