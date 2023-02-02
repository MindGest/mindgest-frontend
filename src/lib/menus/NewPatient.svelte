<script>
    import TextBox from "$lib/components/TextBox.svelte";
    import translate from "$lib/utils/translate";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api";
    import Button from "$lib/components/Button.svelte";

    let data = null;

    onMount(async () => {
        let response = await api.get("patient/types");
        if (response.ok) {
            let types = (await response.json())["data"]["patientTypes"]
            types.push({"id": types.length, "type": "Responsável"})
            data = {
                "type": 0,
                "types": types,
    
                "name": "",
                "email": "",
                "address": "",
                "birthDate": "",
                "photo": "",
                "phoneNumber": "",
                "taxNumber": "",
                "notes": "",
                "careTakerType": "",
                "remarks": "",
                "healthNumber": "",
                "grade": "",
                "school": "",
                "course": "",

            }
        } else {
            alert("Erro ao carregar tipos de utente")
        }
    });

    async function create() {
        let type = data.types[data.type].type
        let body = null;
        let href = null;

        if (type == "Responsável") {
            body =  {
                name: data.name,
                email: data.email,
                phoneNumber: parseInt(data.phoneNumber),
                type: data.careTakerType,
                remarks: data.remarks,
            }
            href = "liable/create"
        } else {

            body = {
                name: data.name,
                email: data.email,
                address: data.address,
                birthDate: new Date(data.birthDate).toISOString(),
                photo: "", 
                phoneNumber: parseInt(data.phoneNumber),
                taxNumber: parseInt(data.taxNumber),
                
                healthNumber: parseInt(data.healthNumber),
                request: "", 
                remarks: "",
                
                patientTypeId: data.types[data.type].id
            };
            
            if (type == "child") {
                body.grade = parseInt(data.grade)
                body.school = data.school
            } else if (type == "teen") {
                body.grade = parseInt(data.grade)
                body.school = data.school
                body.course = data.course
            } else {
                body.profession = data.profession
            }
            href = `patient/${type}/create`
        }
        console.log(body)

        let response = await api.post(href, body);
        if (response.ok) {
            alert(`Sucesso ao criar ${translate(type)}`)
        } else {
            console.log(response)
            alert(`Erro ao criar ${translate(type)}`)
        }
    }
</script>

{#if data != null}
    <div class="text-center">
        {#each data.types as type, i}

            <input
                id={i}
                type="radio"
                name="choice"
                value="{type.type}"
                class="ml-16 mt-5 accent-orange-500"
                checked={i == 0}
                on:click={() => {data.type = i}}
            />
            <label for={i}>{translate(type.type)}</label>
        {/each}
    </div>

    <div class="flex flex-line">

        <div class="{data.types[data.type].type != "Responsável" ? "w-1/2 m-10": "w-1/2 m-auto p-5"}">
            <TextBox class="my-2" label="Nome" bind:value={data.name} />
            <TextBox class="my-2" label="Email" bind:value={data.email} />
            <TextBox class="my-2" label="Contacto Telefónico" bind:value={data.phoneNumber} />
            
            {#if data.types[data.type].type != "Responsável"}
                <TextBox class="my-2" label="Morada" bind:value={data.address} />
                <TextBox class="my-2" label="Data de Nascimento" type="date" bind:value={data.birthDate} />
                <TextBox class="my-2" label="NIF" bind:value={data.taxNumber} />
            {:else} 
                <TextBox class="my-2" label="Notas" bind:value={data.remarks} />
                <TextBox class="my-2" label="Tipo de Responsável" bind:value={data.careTakerType} />
            {/if}
            
            
        </div>
        
        {#if data.types[data.type].type != "Responsável"}
            <div class="w-1/2 m-10">
                <TextBox class="my-2" label="Sistema de Saúde" bind:value={data.healthNumber} />
                {#if ['child', 'teen'].includes(data.types[data.type].type)}
                <TextBox class="my-2" label="Ano de escolaridade" bind:value={data.grade} />
                <TextBox class="my-2" label="Escola" bind:value={data.school} />
                {/if}
                
                {#if data.types[data.type].type == 'teen'}
                <TextBox class="my-2" label="Curso" bind:value={data.course} />
                {/if}
                
                {#if ["adult", "elder"].includes(data.types[data.type].type)}
                <TextBox class="my-2" label="Profissão" bind:value={data.profession} />
                {/if}   
            </div>
        {/if}
    </div>
    <Button class="w-1/2 mx-auto px-5" on:click={create} text={"Criar " + (data.types[data.type].type == "Responsável" ? "Responsável" : "Utente") }/>
{/if}
