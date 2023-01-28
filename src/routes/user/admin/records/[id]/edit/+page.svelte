<script>
  import Button from "$lib/components/Button.svelte";
import Selector from "$lib/components/Selector.svelte";
  import TextDisplay from "$lib/components/TextDisplay.svelte";
  import { onMount } from "svelte";

  let data = null;
  let colaboratorAdd = '';

  onMount(async () => {
    let processId = window.location.href.split("/").slice(-2)[0];


    //TODO: integrate (call miguel if you need something)
    
    // Note: Isto está um bocado vago porque não sei bem que dados e 
    //       em que formato precisam dos dados no backend 

    data = {
        "processId": processId,
        "patient": "Miguel",
        "status": "Ativo",
        "responsavel": "therapistC",
        "new_responsavel": "therapistC",
        "therapists_names": ["therapistA", "therapistB", "therapistC"],
        "speciality": "specB",
        "specialities": ["specA", "specB", "specC"],

        "therapists": [
            {"id": 1, "name": "zé1"},
            {"id": 2, "name": "zé2"},
            {"id": 3, "name": "zé3"},
            {"id": 4, "name": "zé4"},
        ],

        "interns": [
            {"id": 5, "name": "zé5"},
            {"id": 6, "name": "zé6"},
            {"id": 7, "name": "zé7"},
            {"id": 8, "name": "zé8"},
        ],

        "colaborators": {
            "therapists": [
                {"id": 1, "name": "zé1"},
                {"id": 2, "name": "zé2"},
            ],
            "interns": [
                {"id": 5, "name": "zé5"},
                {"id": 6, "name": "zé6"},
            ]
        }
    }

  });

  //TODO: integrate
  async function editRecord() {
    
    let body = {
        //??
    };

    if (data.responsavel != data.new_responsavel) {
        // requestChangeOfResponsavel(data.new_responsavel)
    }

    // editRecordData()

  }

  function formatTherapist(therapist) {
    return "[T-" + therapist.id + "] " + therapist.name;
  }

  function formatIntern(intern) {
    return "[E-" + intern.id + "] " + intern.name;
  }

  function colaboratorsOptions(data) {
    let options = [];

    let picked = [];
    data.colaborators.therapists.forEach(therapist => {
        picked.push(formatTherapist(therapist))
    });
    data.therapists.forEach(therapist => {
        let value = formatTherapist(therapist);
        if (!picked.includes(value)) {
            options.push(value)
        }
    });

    picked = [];
    data.colaborators.interns.forEach(intern => {
        picked.push(formatIntern(intern))
    });
    data.interns.forEach(intern => {
        let value = formatIntern(intern);
        if (!picked.includes(value)) {
            options.push(value)
        }
    });
    return options
  }

  function addColaboratorUI() {
    if (colaboratorAdd != '') {
        let role = colaboratorAdd[1];
        let id = parseInt(colaboratorAdd.split("]")[0].slice(3));
        let name = colaboratorAdd.split("] ")[1]
        if (role == "T") {
            data.colaborators.therapists.push({"id": id, "name": name})
        } else if (role == "E") {
            data.colaborators.interns.push({"id": id, "name": name})
        }
        colaboratorAdd='';
        data.colaborators = data.colaborators // UI force update 
    }
  }

  function removeColaboratorUI(role, id) {
    data.colaborators[role] = data.colaborators[role].filter(value => value.id != id);
  }


</script>

{#if data != null}
    <form class="grid grid-cols-2" on:submit|preventDefault={ async () => await editRecord() }>
        <div>
            <Selector class="my-5 w-1/2 m-auto" label="Profissional Responsável:" values={data.therapists_names} bind:value={data.new_responsavel}/>
            <TextDisplay class="my-5 w-1/2 m-auto" label="Processo" value="{data.processId}" />
            <TextDisplay class="my-5 w-1/2 m-auto" label="Estado do Processo" bind:value="{data.status}" />
            <TextDisplay class="my-5 w-1/2 m-auto" label="Utente" bind:value={data.patient} />
            <TextDisplay class="my-5 w-1/2 m-auto" label="Profissional Responsável" bind:value="{data.responsavel}" />
            <Selector class="my-5 w-1/2 m-auto" label="Especialidade" values={data.specialities} bind:value={data.speciality}/>
            <Button class="my-5 w-1/2 m-auto"  text="Gravar" type="submit"/>
        </div>
        
        <div>
            <div class="flex flex-line m-4">
                <h1 class="text-xl m-auto w-1/6">Colaboradores</h1>
                <a class="w-3/6 text-orange-500 underline" href="/user/therapist/records/{data.processId}/edit/permissions">Editar Permissões de Estagiários</a>
            </div>
   
            <div class="flex flex-line mb-10">
                <Selector class="m-auto w-2/3 p-4" values={colaboratorsOptions(data)} placeholder="Escolha um colaborador" bind:value={colaboratorAdd}/>
                <Button class="m-auto w-10 h-10" text="+" on:click={ () => addColaboratorUI()}/>    
            </div>
         

            {#each data.colaborators.therapists as therapist}
                <div class="flex flex-line">
                    <TextDisplay class="m-auto w-2/3 p-4" value={formatTherapist(therapist)}/>
                    <Button class="m-auto w-10 h-10" text="-" on:click={() => removeColaboratorUI("therapists", therapist.id)}/>
                </div>
            {/each}

            {#each data.colaborators.interns as intern}
                <div class="flex flex-line">
                    <TextDisplay class="m-auto w-2/3 p-4" value={formatIntern(intern)}/>
                    <Button class="m-auto w-10 h-10" text="-" on:click={() => removeColaboratorUI("interns", intern.id)}/>
                </div>
            {/each}

        </div>
    </form>

{/if}

