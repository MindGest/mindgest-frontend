<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextBox from '$lib/components/TextBox.svelte';
	import { requestProfileInfo } from '$lib/utils/util';
	import { onMount } from 'svelte';
	import * as api from '$lib/utils/api';

	let data = null;

	onMount(async () => {
		data = await requestProfileInfo('user/profile/info', 'user/profile/picture'); 
		console.log(data)
	});


	async function uploadProfilePicture() {

	}

	async function editUser() {
		let body = {
			"taxNumber": ,
			"name":  ,
			"email": ,
			"address":  ,
			"birthDate":  ,
			"phoneNumber": , 
			"healthSystem": ,
			"license": ,
			"speciality": ,
		};

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
			<TextBox label="Data de Nascimento" bind:value={data.birth_date} class="my-5" type="date"/>
			<TextBox label="Morada" bind:value={data.address} class="my-5"/>
			<TextBox label="Contacto Telefónico" bind:value={data.phone_number} class="my-5"/>
			<TextBox label="NIF" bind:value={data.tax_number} class="my-5"/>
			<Button class="mt-10" text="Guardar Alterações" on:click={editUser} />
		</div>

	</div>
{/if}
