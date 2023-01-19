<script>
    import TextArea from '$lib/components/TextArea.svelte';
    import TextBox from '$lib/components/TextBox.svelte';
    import Button from '$lib/components/Button.svelte';
    import Table from '$lib/components/Table.svelte';
    import * as api from '$lib/utils/api';
    import { onMount } from "svelte";

    class person { 
        constructor(name, role, proc) {
            this.name = name;
            this.role = role;
        }
    }
    class process{
        constructor(patient, code, esp, terp){
            this.patient = patient;
            this.code = code;
            this.esp = esp;
            this.terp = terp;
        }
    }

    let aps = [];
    let text = "";
    let table;
    const newUt = () => alert("Novo Utente");

    onMount(async () => {
    const response = await api.get('therapist/listPatients', {});
    if (response.ok) {
      let json = await response.json();

      let jsonInfo = json['message'];

      let infoHelper = [];
      for (var i = 0; i < jsonInfo.length; i++) {
        let patientName = jsonInfo[i]["patientName"];
        let newPatient = new person(patientName, 'pat', null);
        let ref = jsonInfo[i]["ref"];
        let speciality = jsonInfo[i]["speciality"];
        let therapists = [];
        let therapistsInfo = jsonInfo[i]["therapists"];

        for(let j=0; j<therapistsInfo.length;j++){
            therapists.push(new person(therapistsInfo[j]["name"], 'terp', null));
        }
        infoHelper.push(new process(newPatient, ref, speciality, therapists));
        
      }
      aps = infoHelper;
      getTableData("all");
      return;
    }
    status = response.status;
  });

    function getTherapist(ap){

        let out = ""
        
        for (let i = 0; ap.terp.length > i; i++){
        
        if (i === 0) out += ap.terp[i].name;
        else out += ", " + ap.terp[i].name;

        }

        return out;

    }

    $: if (text) getNameFilter(text);
    const getNameFilter = (text) => {

        let aux = aps.filter(proc => proc.patient.name.indexOf(text) !== -1);
        let out = [];
        
        for (let i = 0; aux.length > i; i++){
            let p = aux[i]
            out.push({
                Utente: p.patient.name,
                Responsavel: getTherapist(p),
                Codigo: p.code
            })
        }
        
        table = out;

    }

    const getTableData = (flag) => {
        if(aps != null){
            text = null;
            let out = [];
            for (let i = 0; aps.length > i; i++){
                if (!flag || flag === "all"){
                    let p = aps[i]
                    out.push({
                        Utente: p.patient.name,
                        Responsavel: getTherapist(p),
                        Codigo: p.code
                    })
                }
            }
            table = out;
        }
    }

    $: if (!text || text === "") resetNameFilter();
    const resetNameFilter = () => {
        getTableData("all")
    }

</script>

<wrapper
  class="flex flex-col"
  style="margin: 100px; float:left; width:25%; position:absolute; top:10%">
    <TextArea label="Pesquisar Utente" bind:value={text}/>
</wrapper>

<wrapper
  class="flex flex-col"
  style="float:right; width:10%; position:relative; top:20%; bottom:10%; right:50%">
    <Button on:click={newUt}>Novo Utente</Button>
</wrapper>

<div style="margin:100px; position:relative; top:20%">
    
    <p class="font-normal text-2xl">Lista de Utentes:</p>

    <!-- print the list -->
    {#if table.length > 0} <Table data={table}/>
    {/if}

</div>
    

