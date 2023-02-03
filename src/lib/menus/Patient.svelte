<script>
    import TextDisplay from '$lib/components/TextDisplay.svelte';
    import TextArea from '$lib/components/TextArea.svelte';
    import { onMount } from 'svelte';
    import * as api from '$lib/utils/api'
    import { page } from '$app/stores';
    import Avatar from '$lib/components/Avatar.svelte';
    import translate from '$lib/utils/translate';
    import Title from '$lib/components/Title.svelte';
  
    const id = $page.params['id'];
  
    let data = null;
    
    onMount(async () =>{
        let response = await api.post(`patient/${id}/info`);
        if (response.ok) {
            data = (await response.json())["data"];
            console.log(data)
        } else {
            alert("Erro a carregar o perfil do paciente")
        }
        
        data.birthDate= new Date(data.birthDate).toISOString()
        data.birthDate = data.birthDate.slice(0, 10)
    }); 
</script>

{#if data != null}
    <Title class="font-bold mb-10" text="Perfil de {data.name}"/>
    <div class="w-11/12 grid grid-cols-2">
        
        <div>
            <TextDisplay class="my-2 w-2/3 m-auto" label="Tipo de Paciente:" value={translate(`${data.patientTypeName}`)} />
            <TextDisplay class="my-2 w-2/3 m-auto" label="Nome:" value={data.name} />
            <TextDisplay class="my-2 w-2/3 m-auto" label="Data de Nascimento:" value={data.birthDate} />
            <TextDisplay class="my-2 w-2/3 m-auto" label="Morada:" value={data.address} />
            <TextDisplay class="my-2 w-2/3 m-auto" label="Contacto Telefónico:" value={data.phoneNumber} />
            <TextDisplay class="my-2 w-2/3 m-auto" label="Email:" value={data.email} />
        </div>

        <div class="flex flex-col h-full">
            <TextDisplay class="my-2 w-2/3 m-auto" label="NIF:" value={data.taxNumber}/>
            <TextDisplay class="my-2 w-2/3 m-auto" label="Número Segurança Social:" value={data.healthNumber}/>
            <TextDisplay class="my-2 w-2/3 m-auto" label="Motivo de Consulta:" value={data.request}/>
            <TextArea class="my-2 w-2/3 m-auto grow" label="Observações:" value={data.remarks}/>
        </div>
    </div>
{/if}

  