<!--
    Frontend: Miguel
    Integração: Gabriel e Pedro
    Testado: Miguel

    Aplicado em:
        - /user/admin/records/[id]/edit 
        - /user/therapist/records/[id]/edit/
        - /user/intern/records/[id]/edit/

 -->

<script>
    import Button from "$lib/components/Button.svelte";
    import Selector from "$lib/components/Selector.svelte";
    import TextDisplay from "$lib/components/TextDisplay.svelte";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api";

    export let role;
    
    const INTERN = "intern"
    const ADMIN = "admin"
    const THERAPIST = "therapist"

    let data = null;
  
    onMount(async () => {

        let processId = parseInt(window.location.href.split("/").slice(-2)[0]);
        let permissions = {};

        if (role == INTERN) {
            let responsePermissions = await api.post("permissions/get-intern-permissions", {processId: processId});
            if (responsePermissions.ok) {
                permissions = (await responsePermissions.json())["data"];
                if (!permissions.editprocess) {
                    alert("Não tem permissões para editar este processo");
                    return;
                }
            } else {
                alert("Erro a carregar permissões do estagiário");
                return;
            }
        }

        let responseTherapists = await api.get("user/get-all-therapists");
        let responseInterns = await api.get("user/get-all-interns");
        let responseColaborators = await api.post("process/collaborators", {processId: processId});
        let responseProcessData = await api.get(`process/${processId}/info`);
        let responseSpecialities = await api.get("speciality/list");
        
        if (responseTherapists.ok && responseInterns.ok && responseColaborators.ok && responseProcessData.ok && responseSpecialities.ok) {
            let therapists = (await responseTherapists.json())["data"];
            let interns = (await responseInterns.json())["data"];
            let colaborators = (await responseColaborators.json())["data"];
            let processData = (await responseProcessData.json());
            let specialities = (await responseSpecialities.json())["data"];
            
            console.log(specialities)

            let specialities_names = []
            specialities.forEach(spec => {specialities_names.push(spec.speciality)});
            
            let therapists_names = []
            therapists.forEach(therapist => {therapists_names.push(therapist.name)});
            
            data = {
                "role": role,
                "colaboratorAdd": "",
                "processId": processId,
                "permissions": permissions,
                
                "patient": processData.utent,
                "remarks": processData.remarks,
                "status": processData.active,
                "speciality": processData.speciality,
                "responsavel": processData.therapistName,
                
                "therapists": therapists,
                "interns": interns,
                "colaborators": colaborators,
                
                "new_responsavel": processData.therapistName,
                "specialities": specialities_names,
                "therapists_names": therapists_names,
            }
        } else {
            alert("Erro ao carregar processo");
            return;
        }
    });
  
    async function editRecord() {
        if (data.role != ADMIN && (data.responsavel != data.new_responsavel)) {
            let therapistId = getUserId(data.new_responsavel)
            let responseMigrate = await api.post(`/process/${data.processId}/migrate`, {therapistId: therapistId})
            if (!responseMigrate.ok) {
                alert("Erro a fazer pedido de migração")
            }
        }
        
        let ids = [];
        data.colaborators.therapists.forEach(therapist => {ids.push(therapist.id)})
        data.colaborators.interns.forEach(intern => {ids.push(intern.id)})


        let body = {
            speciality: data.speciality,
            therapistId: getUserId(data.responsavel),
            remarks: data.remarks,
            colaborators: ids,
        };

        let responseEdit = await api.post(`process/${data.processId}/edit`, body);
        if (responseEdit.ok) {
            alert("Sucesso a editar processo")
        } else {
            alert("Erro ao editar processo")
        }
        
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
      if (data.colaboratorAdd != '') {
            let role = data.colaboratorAdd[1];
            let id = parseInt(data.colaboratorAdd.split("]")[0].slice(3));
            let name = data.colaboratorAdd.split("] ")[1]
            if (role == "T") {
                data.colaborators.therapists.push({"id": id, "name": name})
            } else if (role == "E") {
                data.colaborators.interns.push({"id": id, "name": name})
            }
            data.colaboratorAdd = '';
            data.colaborators = data.colaborators // UI force update 
        }
    }
  
    function removeColaboratorUI(role, id) {
        data.colaborators[role] = data.colaborators[role].filter(value => value.id != id);
    }

    function getUserId(user) {
        parseInt(user.split("]")[0].split("-")[1])
    }
    
    async function toggleArchive() {
        let response = await api.post(`process/${data.processId}/archive`)
        console.log(response)
        if (response.ok) {
            data.status = !data.status;
            alert("Sucesso arquivar/desarquivar processo")
        } else {
            alert("Erro ao arquivar/desarquivar processo")
        }
    }
  
</script>
  
{#if data != null}
    <form class="grid grid-cols-2" on:submit|preventDefault={ async () => await editRecord() }>
        <div>
            <TextDisplay class="my-5 w-1/2 m-auto" label="Processo" value="{data.processId}" />
            <TextDisplay class="my-5 w-1/2 m-auto" label="Estado do Processo" value={data.status ? "Ativo": "Não Ativo"} />
            <TextDisplay class="my-5 w-1/2 m-auto" label="Utente" bind:value={data.patient} />
           
            {#if data.role != ADMIN}
                <TextDisplay class="my-5 w-1/2 m-auto" label="Profissional Responsável" bind:value="{data.responsavel}" />
                <Selector class="my-5 w-1/2 m-auto" label="Pedido de alteração de responsável para" values={data.therapists_names} bind:value={data.new_responsavel}/>
            {:else}
                <Selector class="my-5 w-1/2 m-auto" label="Profissional Responsável" values={data.therapists_names} bind:value={data.responsavel}/>
            {/if}

            <Selector class="my-5 w-1/2 m-auto" label="Especialidade" values={data.specialities} bind:value={data.speciality}/>
            <Button class="my-5 w-1/2 m-auto"  text="Gravar" type="submit"/>
            {#if (data.role != INTERN) || ((data.role == INTERN) && data.permissions.archive)}
                {#if data.status}
                    <Button class="my-5 w-1/2 m-auto"  text="Arquivar Processo" on:click={() => toggleArchive()}/>
                {:else}
                    <Button class="my-5 w-1/2 m-auto"  text="Desarquivar Processo" on:click={() => toggleArchive()}/>
                {/if}
            {/if}
        </div>
        
        <div>
            <div class="flex flex-line m-4">
                <h1 class="text-xl m-auto w-1/6">Colaboradores</h1>
                {#if data.role != INTERN}
                    <a class="w-3/6 text-orange-500 underline" href="/user/{data.role}/records/{data.processId}/edit/permissions">Editar Permissões de Estagiários</a>
                {/if}
            </div>
    
            {#if data.role != INTERN}
                <div class="flex flex-line mb-10">
                    <Selector class="m-auto w-2/3 p-4" values={colaboratorsOptions(data)} placeholder="Escolha um colaborador" bind:value={data.colaboratorAdd}/>
                    <Button class="m-auto w-10 h-10" text="+" on:click={ () => addColaboratorUI()}/>
                </div>
            {/if}    
        

            {#each data.colaborators.therapists as therapist}
                <div class="flex flex-line">
                    <TextDisplay class="m-auto w-2/3 p-4" value={formatTherapist(therapist)}/>
                    {#if data.role != INTERN}
                        <Button class="m-auto w-10 h-10" text="-" on:click={() => removeColaboratorUI("therapists", therapist.id)}/>
                    {/if}
                </div>
            {/each}

            {#each data.colaborators.interns as intern}
                <div class="flex flex-line">
                    <TextDisplay class="m-auto w-2/3 p-4" value={formatIntern(intern)}/>
                    {#if data.role != INTERN}
                        <Button class="m-auto w-10 h-10" text="-" on:click={() => removeColaboratorUI("interns", intern.id)}/>
                    {/if}
                </div>
            {/each}
        </div>
    </form>

{/if}
  
  