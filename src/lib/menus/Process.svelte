<!-- 
    Frontend: Rita/Miguel 
    Integration: Miguel e Gabriel
    Testing: ??

    Aplicado em:
        - /user/admin/records/[id]
        - /user/therapist/records/[id]
        - /user/intern/records/[id]
 -->
<script>
    import { goto } from '$app/navigation';
    import Button from '$lib/components/Button.svelte';
    import TextDisplay from '$lib/components/TextDisplay.svelte';
    import Title from '$lib/components/Title.svelte';
    import { onMount } from 'svelte';
    import * as api from "$lib/utils/api";
  	import View from '$lib/components/View.svelte';
    
    export let role;
    
    const INTERN = "intern"

    let data = null;
    
    onMount(async () => {
        let processId = parseInt(window.location.href.split("/").slice(-1));
        let permissions = {}

        if (role == INTERN) {
            let responsePermissions = await api.post("permissions/get-intern-permissions", {processId: processId});
            if (responsePermissions.ok) {
                permissions = (await responsePermissions.json())["data"];
                if (!permissions.see) {
                    alert("Não tem permissões para ver este processo");
                    return;
                }
            } else {
                alert("Erro a carregar permissões do estagiário");
                return;
            }
		}



        let responseProcessData = await api.get(`process/${processId}/info`);
        if (responseProcessData) {
            let processData = (await responseProcessData.json())["data"];
            console.log(processData)
            data = {
                "role": role,
                "processId": processId,

                "paid": processData.paid ? "Regularizada" : "Em falta",
                "patients": processData.patients,
                "careTakers": processData.careTakers,
                "remarks": processData.remarks,
                "status": processData.active,
                "speciality": processData.speciality,
                "responsavel": processData.mainTherapist,

                "collaborators": processData.collaborators,
            }
        } else {
            alert("Erro ao carregar processo")
        }
    });

	function formatTherapist(therapist) {
		return '[T-' + therapist.id + '] ' + therapist.name;
	}


	function formatIntern(intern) {
		return '[E-' + intern.id + '] ' + intern.name;
	}

    function formatPatient(patient) {
        return "[" + patient.id + "] " + patient.name;
    }

	function formatCareTaker(careTaker) {
		return "[" + 0 + "] " + careTaker.name;
	}


	function gotoNotes() {
		goto('/user/' + data.role + '/records/' + data.processId + '/notes');
	}

	function gotoAppointments() {
		goto('/user/' + data.role + '/appointments?record=' + data.processId);
	}

	function gotoPayments() {
		goto('/user/' + data.role + '/records/' + data.processId + '/payments');
	}

	function edit() {
		goto('/user/' + data.role + '/records/' + data.processId + '/edit');
	}

	function back() {
		goto('/user/' + data.role + '/records');
	}
</script>

{#if data != null}
    <div class="grid grid-cols-3">
        <div>
            <Title class="text-center my-5" text="Utentes"/>
            <View class="w-2/3 m-auto" data={data.patients} func={formatPatient} placeholder="Sem utentes"/>
            
            <Title class="text-center my-5" text="Responsáveis"/>
            <View class="w-2/3 m-auto" data={data.careTakers} func={formatCareTaker} placeholder="Sem responsáveis"/>
            
            <Title class="text-center my-5" text="Terapeutas"/>
            <View class="w-2/3 m-auto" data={data.collaborators.therapists} func={formatTherapist} placeholder="Sem terapeutas"/>
            
            <Title class="text-center my-5" text="Estagiários"/>
            <View class="w-2/3 m-auto" data={data.collaborators.interns} func={formatIntern} placeholder="Sem Estagiários"/>
        </div>

        <div>
            <TextDisplay class="my-5 w-2/3 m-auto" label="ID do Processo" value={data.processId}/>
            <TextDisplay class="my-5 w-2/3 m-auto" label="Estado do Processo" value={data.status ? "Ativo": "Não Ativo"}/>
            <TextDisplay class="my-5 w-2/3 m-auto" label="Especialidade" value={data.speciality}/>
            <TextDisplay class="my-5 w-2/3 m-auto" label="Situação Financeira" value={data.paid}/>
            <TextDisplay class="my-5 w-2/3 m-auto" label="Profissional Responsável" value={formatTherapist(data.responsavel)}/>
        </div>

        <div class="flex flex-col w-2/3 mx-auto mt-11">
            <Button class="mt-2 mb-2" text="Ver Notas" on:click={gotoNotes}/>
            <Button class="mt-12 mb-1" text="Ver Consultas" on:click={gotoAppointments}/>
            <Button class="mt-12 mb-2" text="Ver Pagamentos" on:click={gotoPayments}/>
            <Button class="mt-12 mb-1" text="Editar Processo" on:click={edit}/>
            <Button class="mt-12 mb-1" text="Voltar ao Menu de Pesquisa" on:click={back}/>
            
        </div>
      </div>

{/if}
