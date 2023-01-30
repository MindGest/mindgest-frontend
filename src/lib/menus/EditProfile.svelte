<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextBox from '$lib/components/TextBox.svelte';
	import { requestProfileInfo } from '$lib/utils/util';
	import { onMount } from 'svelte';
	import * as api from '$lib/utils/api';

    export let self = true;
    export let id = null;
    export let role;

    const INTERN = "intern"
    const THERAPIST = "therapist"

	let data = null;
	
	onMount(async () => {
		if (self || id == null) {
			data = await requestProfileInfo('user/profile/info', 'user/profile/picture');
        	data.role = role
		} else {
			data = await requestProfileInfo(`user/${id}/profile/info`, `user/${id}/profile/picture`);
		}
		data.birthDate = data.birthDate.slice(0,10)
		console.log(data)
    });


	async function uploadProfilePicture() {

	}

	async function editUser() {
		let body =  {
			"name": data.name,
			"birthDate": new Date(data.birthDate).toISOString(),
			"address": data.address,
			"phoneNumber": parseInt(data.phoneNumber),
			"email": data.email,
			"password": data.password,
		};

		if (data.role != INTERN) {
			body.taxNumber = parseInt(data.taxNumber)
		} 
		
		if (data.role == THERAPIST) {
			body.specialty = data.specialty 
			body.license = data.license
		}
		
		console.log(body)

		// let response = await api.put("user/profile/info", body);
		// if (response.ok) {
		// 	alert("Perfil Atualizado!")
		// } else {
		// 	alert("Erro ao atualizar perfil")
		// }

	}
</script>

{#if data != null}
	<div class="flex flex-line">

		<div class="w-1/3 grid grid-rows-2 m-auto justify-items-center p-10">
			<Avatar id="avatar" src={data.photo} class="w-2/3 my-5 p-2" />
			<input id="changeImage" type="file" accept="image/png, image/jpeg" alt="logo" on:change={uploadProfilePicture()} style="display:none"/>
			<label style="cursor: pointer; cursor: hand;" class="underline text-orange-500" for="changeImage">Editar foto de perfil</label>
		</div>

		<div class="w-2/3 flex flex-col">
			<TextBox label="Nome" bind:value={data.name} class="my-5"/>
			<TextBox label="Data de Nascimento" bind:value={data.birthDate} class="my-5" type="date"/>
			<TextBox label="Morada" bind:value={data.address} class="my-5"/>
			<TextBox label="Contacto Telefónico" bind:value={data.phoneNumber} class="my-5"/>
			{#if data.role != INTERN}
        		<TextBox label="NIF" bind:value={data.taxNumber}/>
      		{/if}
      
			{#if data.role == THERAPIST}
				<TextBox class="w-1/2 my-2" label="Cédula OPP" bind:value={data.license}/>
				<TextBox class="w-1/2 my-2" label="Especialidade" bind:value={data.specialty}/>
			{/if}
			<Button class="mt-10" text="Guardar Alterações" on:click={() => editUser()} />
		</div>

	</div>
{/if}
