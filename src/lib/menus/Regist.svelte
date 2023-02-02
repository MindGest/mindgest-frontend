<script>
	import { PUBLIC_FRONTEND_URL } from '$env/static/public';
	import TextBox from '$lib/components/TextBox.svelte';
	import Button from '$lib/components/Button.svelte';
	import Selector from '$lib/components/Selector.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Checkbox from '$lib/components/Checkbox.svelte';
  	import * as api from '$lib/utils/api';
  	import translate from '$lib/utils/translate';

	export let regist = true;

	let data = null;

	
	onMount(async () => {
		let response = await api.get("speciality/list");
		if (!response.ok) {
			return alert("Erro ao obter especialidades")
		}
		let specialities = (await response.json())["data"];
		let specialities_names = []
		specialities.forEach(spec => {specialities_names.push(spec.speciality)});

		data = {
			option: 'admin',
			roles: ['admin', 'therapist', 'guard', 'accountant', 'intern'],
			specialties: specialities_names,
	
			name: '',
			birth_date: new Date().toISOString().slice(0,10),
			address: '',
			phone_number: '',
			email: '',
			specialty: '',
			tax_number: '',
			license: '',
			email: '',
			password: '',
			healthSystem: '',
			extern: false
		};
	});

	async function register() {
		let body = {
			name: data.name,
			role: data.option,
			birthDate: new Date(data.birth_date).toISOString(),
			address: data.address,
			phoneNumber: parseInt(data.phone_number),
			email: data.email,
			password: data.password,
		};

		if (data.option != 'intern') {
			body.taxNumber = parseInt(data.tax_number);
		}

		if (data.option == 'therapist') {
			body.speciality = data.specialty;
			body.license = data.license;
			body.healthSystem = data.healthSystem;
			body.extern = data.extern
		}

		let responseRegister = await api.post("auth/register/", body);
		if (!responseRegister.ok) {
			return alert("Erro ao criar utilizador")
		}

		let verification = null;
		if (regist) {
			verification = {
				email: body.email,
				callback: PUBLIC_FRONTEND_URL + "auth/login"
			}		
		} else {
			verification = {email: body.email}	
		}

		let responseVerification = await api.post("email/account-verification", verification);
		if (responseVerification.ok) {
			if (regist) {
				alert("Por favor verifique a conta através do link enviado para o seu email")
			} else {
				// alert("Token recebido")
			}
		} else {
			if (regist) {
				return alert("Erro ao enviar email de verificação")
			} else {
				return alert("Erro ao obter token")
			}
		}

		if (!regist) {
			let userId = (await responseRegister.json())["data"]["userId"];
			let token = (await responseVerification.json())["token"];

			let responseVerify = await api.post("auth/verify-account", {token: token});
			if (responseVerify.ok) {
				alert("Conta Verificada")
			} else {
				return alert("Erro ao verificar conta")
			}

			// let responseApprove = await api.put(`user/${userId}/profile/approve`);
			// if (responseApprove) {
			// 	alert("Conta Aprovada")
			// } else {
			// 	return alert("Erro ao aprovar conta")
			// }
		}
	}
	</script>

{#if data != null}
	
	<div class="flex">
		<div class="w-11/12">
			<div>
				{#if regist}
					<h1 class="text-4xl mt-10 mx-10 my-5 text-orange-500">Registo</h1>
					<hr class="border-orange-500 mr-5 ml-10 " />
				{/if}
			</div>
			<div class="mx-10 mt-5">
				{#each data.roles as role, i}
					<input
					id={i}
					type="radio"
					name="choice"
					value={role}
					class="ml-16 mt-5 accent-orange-500"
					checked={i == 0}
					on:click={() => (data.option = data.roles[i])}
					/>
					<label for={i}>{translate(role)}</label>
				{/each}
			</div>
		</div>
		{#if regist}
			<img src="/img/logo.png" alt="logo" class="p-3 object-cover h-40 w-40 my-auto mr-10" />
		{/if}
	</div>
	

	<div class="grid grid-cols-2">
		<div class="mx-auto w-2/3">
			<TextBox label="Email" class="my-5" bind:value={data.email} />
			<TextBox label="Password" class="my-5" type="password" bind:value={data.password} />
			<TextBox label="Nome" class="my-5" bind:value={data.name} />
			<TextBox label="Data de Nascimento" class="my-5" type="date" bind:value={data.birth_date} />
			<TextBox label="Morada" class="my-5" bind:value={data.address} />
		</div>
		
		<div class="mx-auto w-2/3">
			<TextBox label="Contacto Telefónico" class="my-5" bind:value={data.phone_number} />
			<!-- NIF: All but intern -->
			{#if data.option != "intern"}
				<TextBox label="NIF" class="my-5" bind:value={data.tax_number}/>
			{/if}

			<!-- Only Terapeuta -->
			{#if data.option == "therapist"}
				<TextBox label="Cédula OPP" class="my-2" bind:value={data.license}/>
				<Selector label="Especialidade" class="my-2" bind:value={data.specialty} values={data.specialties}/>
				<TextBox class="my-2" label="Sistema de Saúde" bind:value={data.healthSystem}/>
				<Checkbox class="my-3" label="Externo" bind:checked={data.extern}/>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-2 mt-5">
		<Button class="mx-16 mb-20 " text="Voltar" on:click={() => goto('/auth/login')} />
		{#if regist}
			<Button class="mx-16 mb-20 " text="Enviar pedido de Registo" on:click={register} />
		{:else}
			<Button class="mx-16 mb-20 " text="Criar Utilizador" on:click={register} />
		{/if}
	</div>

{/if}
