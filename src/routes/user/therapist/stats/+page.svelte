<script>
  import Button from "$lib/components/Button.svelte";
  import Selector from "$lib/components/Selector.svelte";
  import TextBox from "$lib/components/TextBox.svelte";
  import { onMount } from "svelte";

  let start = "";
  let end = "";
  let record = "";
  let speciality = "";

  let records = ["Proc1", "Proc2", "Proc3"]
  let specialities = ["EspA", "EspB", "EspC"];

    onMount(async () => {
        //TODO: getAvailableRecords(this.user) & getAvailableSpecialities(*all*);
    });

  async function generate() {
    let body = {
        "startDate": new Date(start).toISOString,
        "endDate": new Date(end).toISOString,
        "processId": record,
        "specialityId": speciality,
        // "therapistId": null
    };

    //TODO: getStatistic()
  }

</script>

<h1 class="text-4xl text-center mt-5 mb-10">Gerar estatísticas</h1>

<form on:submit|preventDefault={async () => { await generate() }}>
    <TextBox class="my-5 w-1/2 m-auto" label="Data de Início" type="date" bind:value={start}/>
    <TextBox class="my-5 w-1/2 m-auto" label="Data de Fim" type="date" bind:value={end}/>
    
    <Selector class="my-5 w-1/2 m-auto" label="Processo" values={records} bind:value={record}/>
    <Selector class="my-5 w-1/2 m-auto" label="Especialidade" values={specialities} bind:value={speciality}/>
    
    <Button class="my-5 w-1/2 m-auto" type="submit" text="Gerar"/>
</form>  