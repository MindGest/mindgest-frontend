<script>

  import CalendarAccount from "svelte-material-icons/CalendarAccount.svelte";
  import Eye from "svelte-material-icons/Eye.svelte";
  import Pencil from "svelte-material-icons/Pencil.svelte";
  import ChartBar from "svelte-material-icons/ChartBar.svelte";
  import AccountCircle from "svelte-material-icons/AccountCircle.svelte";
  import Folder from "svelte-material-icons/Folder.svelte";
  import Checkbox from "$lib/components/Checkbox.svelte";
  import Button from "$lib/components/Button.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import * as api from '$lib/utils/api';
  import PreviousMap from "postcss/lib/previous-map";

    const size = 40;
    
    let processId;
    
    let interns = [
        {
            editprocess: false,
            see: true,
            appoint: false,
            statistics: true,
            editpatient: false,
            archive: false,
            name: "PaPa PiÇaS",
            collaboratorId: 1
        },
        {
            editprocess: true,
            see: true,
            appoint: false,
            statistics: true,
            editpatient: true,
            archive: false,
            name: "PaPa PiÇaSgfdsgsdffdsafsdafasdfadsfadsfasdfasdfdasfadsfdasfadsfdsafdasfdsafdsafsadfsdafasdfgsfdgfsdgsdfg2",
            collaboratorId: 2
        }
    ];


    
    onMount(async () => {
        processId = window.location.href.split("/")[window.location.href.split("/").length - 3]
        //TODO: get interns
        let response = await api.post("/get-interns-permissions", {});

        if (response.ok){
            let json = await response.json();
            interns = json['data'];
        }
    });

    async function updatePermissions() {
        console.log(interns)
        //TODO: Update permissions

        // iterate the interns of the process
        for (let i = 0; i < interns.length; i++){
            // create the json with the required info
            let body = {
                collaboratorId: interns[i].collaboratorId, // id of the intern
                appoint: interns[i].appoint,
                statistics: interns[i].statistics,
                editProcess: interns[i].editprocess,
                editPatient: interns[i].editpatient,
                archive: interns[i].archive,
                see: interns[i].see,
                processId: processId,
            }

            // call the endpoint and pass a json with the permissions of the user
            let response = await api.put("/edit-intern-permissions", body);
            if (!response.ok){
                console.log("An error ocurred updating the permissions of an intern.")
            }
        }
    }

</script>

<h1 class="text-4xl font-bold m-10">Lista de estagiários associados ao processo</h1>
<div class="m-10 grid grid-cols-7 justify-items-center">
    <p></p>
    <CalendarAccount {size}/>
    <Eye {size}/>
    <Pencil {size}/>
    <ChartBar {size}/>
    <AccountCircle {size}/>
    <Folder {size}/>
</div>

{#each interns as intern}
<div class="m-10 grid grid-cols-7 justify-items-center">
    <div>
        <h1 class="break-all">{intern.name}</h1>
    </div>
    <Checkbox class="ml-2" bind:checked={intern.appoint}/>
    <Checkbox class="ml-2" bind:checked={intern.see}/>
    <Checkbox class="ml-2" bind:checked={intern.editprocess}/>
    <Checkbox class="ml-2" bind:checked={intern.statistics}/>
    <Checkbox class="ml-2" bind:checked={intern.editpatient}/>
    <Checkbox class="ml-2" bind:checked={intern.archive} />
</div>
{/each}

<div class="grid grid-cols-2">
    <Button class="mx-16 my-20" text="Voltar ao Processo" on:click={() => goto(window.location.href.split("/").slice(0, window.location.href.split("/").length - 2).join("/"))}/>
    <Button class="mx-16 my-20" text="Gravar" on:click={async () => await updatePermissions()}/>
</div>
