<script>
    // import { goto } from '$app/navigation';
    import TableMenu from '$lib/menus/TableMenu.svelte';
  	import translate from '$lib/utils/translate';
  	import { onMount } from 'svelte';
    
    let data = null;
    onMount(async () => {
		const data1 = [
      		{
				patientName: '1Carolina Pereira',
				therapistListing: '1João Silva',
				speciality: '1Psicologia'
			},
			{
				patientName: '1João Silva',
				therapistListing: '1Fátima Valente',
				speciality: '1Terapia Familiar'
			}
    	];

		const data2 = [
			{
				patientName: '2Carolina Pereira',
				therapistListing: '2João Silva',
				speciality: '2Psicologia'
			},
			{
				patientName: '2João Silva',
				therapistListing: '2Fátima Valente',
				speciality: '2Terapia Familiar'
			}
		];
		data = {
			type: 0,
			types: ["Utente", "Responsável"],
			data1: data1,
			data2: data2
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
			data={data.data1}
			id="recordCode"
			add={true}
			select="speciality"
			search={['patientName', 'therapistListing']}
		/>

	{:else}

		<TableMenu
			data={data.data2}
			id="recordCode"
			add={true}
			select="speciality"
			search={['patientName', 'therapistListing']}
		/>

	{/if}

{/if}

<!-- {
	listpatient
    name: careTaker?.name,
    email: careTaker?.email,
    phoneNumber: careTaker?.phonenumber,
    type: careTaker?.type,
    remarks: careTaker?.remarks,
    careTakerId: careTaker?.id,
  } -->