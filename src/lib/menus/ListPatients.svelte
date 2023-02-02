<script>
    import TableMenu from '$lib/menus/TableMenu.svelte';
  	import { onMount } from 'svelte';
	import * as api from "$lib/utils/api"
  import translate from '$lib/utils/translate';
    
    let data = null;
    onMount(async () => {
		let responsePatients = await api.get("patient/list");
		let responseLiables = await api.get("liable/list");

		if (!responsePatients.ok) {
			return alert("Erro ao obter utentes")
		}

		if (!responseLiables.ok) {
			return alert("Erro ao obter responsáveis")
		}

		let dataPatients = (await responsePatients.json())["data"];

		let dataLiables = (await responseLiables.json())["data"];

		let patients = []
		dataPatients.forEach(patient => {
			patients.push({
				"id": patient.id,
				"name": patient.name,
				"address": patient.address,
				"approved": patient.approved ? "Sim" : "Não",
				"email": patient.email,
				"taxNumber": patient.taxNumber,
				"phoneNumber": patient.phoneNumber,
				"birthDate": patient.birthDate.slice(0,10),
				"healthNumber": patient.healthNumber,
				"patientTypeName": translate(patient.patientTypeName)

			})
		})

		let liables = []
		dataLiables.forEach(liable => {
			liables.push({
				"id": liable.liableId,
				"name": liable.name,
				"email": liable.email,
				"phoneNumber": liable.phoneNumber,
				"type": liable.type,
				"remarks": liable.remarks,
			})
		})


		data = {
			type: 0,
			types: ["Utentes", "Responsáveis"],
			dataPatients: patients,
			dataLiables: liables
		}
    });

</script>

{#if data != null}
	<div class="text-center mb-10">
		{#each data.types as type, i}
			<input
			id={i}
			type="radio"
			name="choice"
			value="{type}"
			class="ml-16 mt-5 accent-orange-500"
			checked={i == 0}
			on:click={() => {data.type = i}}
			/>
			<label for={i}>{type}</label>
		{/each}
	</div>

	{#if data.type == 0}
		<TableMenu
			data={data.dataPatients}
			id="id"
			add={true}
			select="speciality"
			search={['id', 'name', 'address', 'approved', 'email', 'taxNumber', 'phoneNumber', 'birthDate', 'healthNumber', 'patientTypeName']}
		/>
	{:else}
		<TableMenu
			data={data.dataLiables}
			id="id"
			add={true}
			search={["id", "name", "email", "phoneNumber", "type", "remarks"]}
			clickable={false}
		/>
	{/if}
{/if}
