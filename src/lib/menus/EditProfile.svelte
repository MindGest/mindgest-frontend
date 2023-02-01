<!--
    Frontend: Miguel
    Integração: Gabriel e Pedro
    Testado: Miguel

    Aplicado em:
        - /user/admin/profile/edit
        - /user/therapist/profile/edit
        - /user/guard/profile/edit
        - /user/accountant/profile/edit
        - /user/intern/profile/edit
 -->
<script>
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextBox from '$lib/components/TextBox.svelte';
	import { requestProfileInfo } from '$lib/utils/util';
	import { onMount } from 'svelte';
	import * as api from '$lib/utils/api';
  	import Checkbox from '$lib/components/Checkbox.svelte';
  	import Selector from '$lib/components/Selector.svelte';
  	import { StatusCodes } from 'http-status-codes';

    export let self = true;
    export let id = null;
    export let role;

    const INTERN = "intern"
    const THERAPIST = "therapist"

	let data = null;
	
	onMount(async () => {
		if (self || id == null) {
			data = await requestProfileInfo('user/profile/info', 'user/profile/picture');
        	if (data != null) {
				data.role = role
			}
		} else {
			data = await requestProfileInfo(`user/${id}/profile/info`, `user/${id}/profile/picture`);
		}
		if (data != null) {
			data.birthDate = data.birthDate.slice(0,10)
		}

		let responseSpecialities = await api.get("speciality/list");
		let specialities = (await responseSpecialities.json())["data"];
		if (responseSpecialities.ok) {
			let specialities_names = []
            specialities.forEach(spec => {specialities_names.push(spec.speciality)});
			data.specialities = specialities_names
		} else {
			alert("Erro ao carregar especialidades")
		}
    });



	async function uploadProfilePicture(event) {
		let formData = new FormData();
		formData.append('picture', event.target.files[0]);
		
		let response = null;
		if (self || id == null) {
			response = await api.upload(`user/profile/picture`, formData);
		} else {
			response = await api.upload(`user/${id}/profile/picture`, formData);
		}

		if (response.status == StatusCodes.CREATED) {
			let avatar = document.getElementById('avatar')
			avatar.src = URL.createObjectURL(event.target.files[0]);
			alert("Sucesso: Foto de perfil atualizada!")
		} else {
			alert("Erro ao atualizar foto de perfil")
		}
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
			body.license = data.license
			body.speciality = data.speciality 
			body.healthSystem = data.healthSystem
			body.extern = data.extern
		}
		
		let response = null;
		if (self || id == null) {
			response = await api.put(`user/profile/info`, body);
		} else {
			response = await api.put(`user/${id}/profile/info`, body);
		}

		if (response.ok) {
			alert("Perfil Atualizado!")
		} else {
			alert("Erro ao atualizar perfil")
		}

	}
</script>

{#if data != null}
	<div class="flex flex-line">

		<div class="w-1/3 grid grid-rows-2 m-auto justify-items-center p-10">
			<Avatar id="avatar" src={data.photo} class="w-2/3 my-5 p-2" />
			<input id="changeImage" type="file" accept="image/png, image/jpeg, image/jpg" alt="logo" on:change={async (ev) => {await uploadProfilePicture(ev)}} style="display:none"/>
			<label style="cursor: pointer; cursor: hand;" class="underline text-orange-500" for="changeImage">Editar foto de perfil</label>
		</div>

			<div class="w-1/3 flex flex-col">
				<TextBox class="w-2/3 my-2"label="Nome" bind:value={data.name}/>
				<TextBox class="w-2/3 my-2"label="Data de Nascimento" bind:value={data.birthDate} type="date"/>
				<TextBox class="w-2/3 my-2" label="Morada" bind:value={data.address}/>
				<TextBox class="w-2/3 my-2" label="Contacto Telefónico" bind:value={data.phoneNumber} />
				<Button class="mt-10 w-2/3" text="Guardar Alterações" on:click={() => editUser()} />
			</div>
			
			<div class="w-1/3 flex flex-col">
				{#if data.role != INTERN}
				<TextBox class="w-2/3 my-2" label="NIF" bind:value={data.taxNumber}/>
				{/if}
				
				{#if data.role == THERAPIST}
					<TextBox class="w-2/3 my-2" label="Cédula OPP" bind:value={data.license}/>
					<Selector class="w-2/3 my-2" label="Especialidade" values={data.specialities} bind:value={data.speciality}/>
					<TextBox class="w-2/3 my-2" label="Sistema de Saúde" bind:value={data.healthSystem}/>
					<Checkbox class="w-2/3 my-2" label="Externo" bind:checked={data.extern}/>
				{/if}
			</div>
		</div>
		
{/if}
