<script>
  import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import TextBox from "$lib/components/TextBox.svelte";
	import * as api from '$lib/utils/api';
  	import { onMount } from "svelte";
	  
	export let role; 
	export { role as data };

	let data = null;

	onMount(async () => {
		data = {
			"role": role.role,
			"speciality": '',
			"code": '',
			"description": '',
		}
	});


	async function create() {
		let body = {
			"speciality": data.speciality,
			"code": data.code,
			"description": data.description
		}

		let response = await api.post('speciality/create', body);
		if (response.ok){
			alert("Sucess: Especialidade adicionada!")
		} else {
			alert("Erro ao criar novo serviço")
		}

	}

</script>
{#if data != null}
	
	<h1 class="text-4xl text-center mt-5 mb-10">Criar nova especialidade</h1>


	<form on:submit|preventDefault={async () => { await create() }}>    
		<TextBox class="my-5 w-1/2 m-auto" label="Especialidade" bind:value={data.speciality}/>
		<TextBox class="my-5 w-1/2 m-auto" label="Código" bind:value={data.code}/>
		<TextArea class="my-5 w-1/2 m-auto" label="Descrição" bind:value={data.description}/>
		<Button class="my-10 w-1/2 m-auto" type="submit" text="Criar"/>
	</form>
	<a class="block text-center text-orange-500 underline" href="/user/{data.role}/services">Voltar ao menu de serviços</a>
{/if}