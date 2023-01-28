<script>
  import Button from "$lib/components/Button.svelte";
  import Selector from "$lib/components/Selector.svelte";
  import TextBox from "$lib/components/TextBox.svelte";
  import { onMount } from "svelte";
  import jsPDF from "jspdf";
  import autoTable  from "jspdf-autotable";

  let start = "";
  let end = "";
  let record = "";
  let speciality = "";

  let records = ["Proc1", "Proc2", "Proc3"]
  let specialities = ["EspA", "EspB", "EspC"];

    onMount(async () => {
        //TODO: getAvailableRecords(this.user) & getAvailableSpecialities(*all*);
    });

  function generate() {
    let body = {
        "startDate": new Date(start).toISOString(),
        "endDate": new Date(end).toISOString(),
        "processId": record,
        "specialityId": speciality,
        // "therapistId": null
    };

    //TODO: getStatistic()
    console.log(body)




    // let returnData = {
    //   "totalAppointments": 2,
    //   "specialitiesAppointments": [
    //     {"speciality": "cenas1", "total": 23},
    //     {"speciality": "cenas2", "total": 22},
    //     {"speciality": "cenas3", "total": 21},
    //     {"speciality": "cenas4", "total": 13},
    //     {"speciality": "cenas5", "total": 9},
    //     {"speciality": "cenas6", "total": 4},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //     {"speciality": "a", "total": 0},
    //   ],
    //   "processAppointments": [
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //     {"processId": "1","total": 2},
    //   ],
    //   "therapistsApointments": [
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //     {"therapist": "teste2", "total": 2},
    //   ]
    // }
    // const pdf = new jsPDF('p','pt', 'a4', true);
    // pdf.text(20,20, "Estatísticas")
    // autoTable(pdf, {
    //   columns: [
    //     {header: "Especialidade", dataKey: "speciality"},
    //     {header: "#", dataKey: "total"}
    //   ],
    //   body: returnData.specialitiesAppointments
    // })

    // autoTable(pdf, {
    //   columns: [
    //     {header: "Processo", dataKey: "processId"},
    //     {header: "#", dataKey: "total"}
    //   ],
    //   body: returnData.processAppointments
    // })

    // autoTable(pdf, {
    //   columns: [
    //     {header: "Terapeuta", dataKey: "therapist"},
    //     {header: "#", dataKey: "total"}
    //   ],
    //   body: returnData.therapistsApointments
    // })
    // pdf.save("test.pdf")
  }

</script>

<h1 class="text-4xl text-center mt-5 mb-10">Gerar estatísticas</h1>

<form on:submit|preventDefault={() => { generate() }}>
    <TextBox class="my-5 w-1/2 m-auto" label="Data de Início" type="date" bind:value={start}/>
    <TextBox class="my-5 w-1/2 m-auto" label="Data de Fim" type="date" bind:value={end}/>
    
    <Selector class="my-5 w-1/2 m-auto" label="Processo" values={records} bind:value={record}/>
    <Selector class="my-5 w-1/2 m-auto" label="Especialidade" values={specialities} bind:value={speciality}/>
    
    <Button class="my-5 w-1/2 m-auto" type="submit" text="Gerar"/>
</form>  