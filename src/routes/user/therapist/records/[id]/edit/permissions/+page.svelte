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
            name: "PaPa PiÇaS"
        },
        {
            editprocess: true,
            see: true,
            appoint: false,
            statistics: true,
            editpatient: true,
            archive: false,
            name: "PaPa PiÇaSgfdsgsdffdsafsdafasdfadsfadsfasdfasdfdasfadsfdasfadsfdsafdasfdsafdsafsadfsdafasdfgsfdgfsdgsdfg2"
        }
    ];


    
    onMount(async () => {
        processId = window.location.href.split("/")[window.location.href.split("/").length - 3]
        //TODO: get interns

    });

    async function updatePermissions() {
        console.log(interns)
        //TODO: Update permissions
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
