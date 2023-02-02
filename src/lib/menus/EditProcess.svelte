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
    import { page } from "$app/stores";
    import EditView from "$lib/components/EditView.svelte";
    import View from "$lib/components/View.svelte";
    import Title from "$lib/components/Title.svelte";

    export let role;
    
    const INTERN = "intern"
    const ADMIN = "admin"
    const THERAPIST = "therapist"

    let data = null;
  
    onMount(async () => {

        let processId = parseInt($page.params['id']);
        let permissions = {};

        if (role == INTERN) {
            let responsePermissions = await api.post("permissions/get-intern-permissions", {processId: processId});
            if (responsePermissions.ok) {
                permissions = (await responsePermissions.json())["data"];
                if (!permissions.editprocess) {
                    return alert("Não tem permissões para editar este processo");
                }
            } else {
                return alert("Erro a carregar permissões do estagiário");
            }
        }

        let responseTherapists = await api.get("user/get-all-therapists");
        let responseInterns = await api.get("user/get-all-interns");
        let responseProcessData = await api.get(`process/${processId}/info`);
        let responseSpecialities = await api.get("speciality/list");
        
        if (responseTherapists.ok && responseInterns.ok && responseProcessData.ok && responseSpecialities.ok) {
            let therapists = (await responseTherapists.json())["data"];
            let interns = (await responseInterns.json())["data"];
            let processData = (await responseProcessData.json())["data"];
            let specialities = (await responseSpecialities.json())["data"];
            
            console.log(processData)
            let specialities_names = []
            specialities.forEach(spec => {specialities_names.push(spec.speciality)});
            

            let all_therapists_names = []
            therapists.forEach(therapist => {all_therapists_names.push(formatTherapist(therapist))});

            let all_interns_names = []
            interns.forEach(intern => {all_interns_names.push(formatIntern(intern))});


            let process_therapists_names = []
            processData.collaborators.therapists.forEach(therapist => {process_therapists_names.push(formatTherapist(therapist))});
            
            let process_interns_names = []
            processData.collaborators.interns.forEach(intern => {process_interns_names.push(formatIntern(intern))});
            
            let process_patients_names = []
            processData.patients.forEach(patient => {process_patients_names.push(formatPatient(patient))})

            let process_careTakers_names = []
            processData.careTakers.forEach(careTaker => {process_careTakers_names.push(formatCareTaker(careTaker))})

            console.log(processData)
            data = {
                "role": role,
                "colaboratorAdd": "",
                "processId": processId,
                "permissions": permissions,
                
                "specialities": specialities_names,
                
                "allTherapists": all_therapists_names,
                "allInterns": all_interns_names,
                "allCollaborators": all_therapists_names.concat(all_interns_names),

                "therapists": process_therapists_names,
                "interns": process_interns_names,
                "collaborators": process_therapists_names.concat(process_interns_names),

                "patients": process_patients_names,
                "careTakers": process_careTakers_names,

                "remarks": processData.remarks,
                "status": processData.active,
                "speciality": processData.speciality,
                "responsavel": formatTherapist(processData.mainTherapist),
                "new_responsavel": formatTherapist(processData.mainTherapist),
            
            }
            console.log(data)
        } else {
            return alert("Erro ao carregar processo");
        }
    });
  
    async function editRecord() {
        if (data.role == ADMIN && (data.responsavel != data.new_responsavel)) {
            let therapistId = getId(data.new_responsavel)
            let responseMigrate = await api.post(`process/${data.processId}/migrate`, {therapistId: therapistId})
            if (!responseMigrate.ok) {
                alert("Erro a migrar processo")
            }
        }
        
        let ids = [];
        data.collaborators.forEach(collaborator => {ids.push(getId(collaborator))})


        let body = {
            speciality: data.speciality,
            remarks: data.remarks,
            colaborators: ids,
        };
        console.log(body)

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

    function formatPatient(patient) {
        return "[" + patient.id + "] " + patient.name;
    }

    function formatCareTaker(careTaker) {
        return "[" + careTaker.careTakerId + "] " + careTaker.name;
	}
        
    function getId(user) {
        return parseInt(user.split("]")[0].split("-")[1])
    }
    
    async function toggleArchive() {
        let response = await api.post(`process/${data.processId}/archive`)
        if (response.ok) {
            data.status = !data.status;
            alert("Sucesso arquivar/desarquivar processo")
        } else {
            alert("Erro ao arquivar/desarquivar processo")
        }
    }

</script>

{#if data != null}
        <div class="flex flex-col">
            <TextDisplay class="my-5 w-2/3 m-auto" label="ID do Processo" value="{data.processId}" />
            <TextDisplay class="my-5 w-2/3 m-auto" label="Estado do Processo" value={data.status ? "Ativo": "Não Ativo"} />
           
            {#if data.role != ADMIN}
                <TextDisplay class="my-5 w-2/3 m-auto" label="Profissional Responsável" bind:value="{data.responsavel}" />
                <Selector class="my-5 w-2/3 m-auto" label="Pedido de alteração de responsável para" values={data.allTherapists} bind:value={data.new_responsavel}/>
            {:else}
                <Selector class="my-5 w-2/3 m-auto" label="Profissional Responsável" values={data.allTherapists} bind:value={data.new_responsavel}/>
            {/if}

            <Selector class="my-5 w-2/3 m-auto mb-10" label="Especialidade" values={data.specialities} bind:value={data.speciality}/>
            <Button class="my-5 w-2/3 m-auto"  text="Gravar" type="submit"/>
            {#if (data.role != INTERN) || ((data.role == INTERN) && data.permissions.archive)}
                {#if data.status}
                    <Button class="my-5 w-2/3 m-auto"  text="Arquivar Processo" on:click={() => toggleArchive()}/>
                {:else}
                    <Button class="my-5 w-2/3 m-auto"  text="Desarquivar Processo" on:click={() => toggleArchive()}/>
                {/if}
            {/if}
            {#if data.role != INTERN}
                <a class="self-center text-orange-500 underline " href="/user/{data.role}/records/{data.processId}/edit/permissions">Editar Permissões de Estagiários</a>
            {/if}
        </div>

        <div>
            <Title class="text-center my-5" text="Utentes"/>
            <View class="w-2/3 m-auto" data={data.patients} func={x => x} placeholder="Sem Utentes"/>
            
            <Title class="text-center my-5" text="Responsáveis"/>
            <View class="w-2/3 m-auto" data={data.careTakers} func={x => x} placeholder="Sem Responsáveis"/>
        </div>

        <div>
            {#if data.role != INTERN}
                <EditView title="Colaboradores" bind:values={data.allCollaborators} bind:chosen={data.collaborators} />
            {:else}
                <View data={data.collaborators} func={x => x} placeholder="Sem Colaboradores"/>
            {/if} 
        </div>
{/if}
