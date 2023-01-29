<!--
    Frontend: Miguel
    Integração: Gabriel
    Testado: ??

    Aplicado em:
        - /user/admin/records/[id]/edit 
        - /user/therapist/records/[id]/edit/
        - /user/intern/records/[id]/edit/

 -->

<script>
    import Button from "$lib/components/Button.svelte";
    import Selector from "$lib/components/Selector.svelte";
    import TextDisplay from "$lib/components/TextDisplay.svelte";
  import translate from "$lib/utils/translate";
    import { onMount } from "svelte";
    
    const INTERN = "intern"
    const ADMIN = "admin"
    const THERAPIST = "therapist"

    let data = null;
    let role = '';
    let colaboratorAdd = '';
  
    onMount(async () => {
        let processId = window.location.href.split("/").slice(-2)[0];
        
        role = ADMIN
        role = THERAPIST
        role = INTERN

        data = {
            "processId": processId,
            "patient": "Miguel",
            "status": true,
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
    
    function archive() {
        data.status = false;
    }
    
    function unarchive() {
        data.status = true;

    }
  
</script>
  
{#if data != null}
    <form class="grid grid-cols-2" on:submit|preventDefault={ async () => await editRecord() }>
        <div>
            <TextDisplay class="my-5 w-1/2 m-auto" label="Processo" value="{data.processId}" />
            <TextDisplay class="my-5 w-1/2 m-auto" label="Estado do Processo" value={data.status ? "Ativo": "Não Ativo"} />
            <TextDisplay class="my-5 w-1/2 m-auto" label="Utente" bind:value={data.patient} />
           
            {#if role != ADMIN}
                <TextDisplay class="my-5 w-1/2 m-auto" label="Profissional Responsável" bind:value="{data.responsavel}" />
                <Selector class="my-5 w-1/2 m-auto" label="Pedido de alteração de responsável para" values={data.therapists_names} bind:value={data.new_responsavel}/>
            {:else}
                <Selector class="my-5 w-1/2 m-auto" label="Profissional Responsável" values={data.therapists_names} bind:value={data.responsavel}/>
            {/if}

            <Selector class="my-5 w-1/2 m-auto" label="Especialidade" values={data.specialities} bind:value={data.speciality}/>
            <Button class="my-5 w-1/2 m-auto"  text="Gravar" type="submit"/>
            
            {#if data.status}
                <Button class="my-5 w-1/2 m-auto"  text="Arquivar Processo" on:click={() => archive()}/>
            {:else}
                <Button class="my-5 w-1/2 m-auto"  text="Desarquivar Processo" on:click={() => unarchive()}/>
            {/if}
        </div>
        
        <div>
            <div class="flex flex-line m-4">
                <h1 class="text-xl m-auto w-1/6">Colaboradores</h1>
                {#if role != INTERN}
                    <a class="w-3/6 text-orange-500 underline" href="/user/therapist/records/{data.processId}/edit/permissions">Editar Permissões de Estagiários</a>
                {/if}
            </div>
    
            {#if role != INTERN}
                <div class="flex flex-line mb-10">
                    <Selector class="m-auto w-2/3 p-4" values={colaboratorsOptions(data)} placeholder="Escolha um colaborador" bind:value={colaboratorAdd}/>
                    <Button class="m-auto w-10 h-10" text="+" on:click={ () => addColaboratorUI()}/>
                </div>
            {/if}    
        

            {#each data.colaborators.therapists as therapist}
                <div class="flex flex-line">
                    <TextDisplay class="m-auto w-2/3 p-4" value={formatTherapist(therapist)}/>
                    {#if role != INTERN}
                        <Button class="m-auto w-10 h-10" text="-" on:click={() => removeColaboratorUI("therapists", therapist.id)}/>
                    {/if}
                </div>
            {/each}

            {#each data.colaborators.interns as intern}
                <div class="flex flex-line">
                    <TextDisplay class="m-auto w-2/3 p-4" value={formatIntern(intern)}/>
                    {#if role != INTERN}
                        <Button class="m-auto w-10 h-10" text="-" on:click={() => removeColaboratorUI("interns", intern.id)}/>
                    {/if}
                </div>
            {/each}
        </div>
    </form>

{/if}
  
  