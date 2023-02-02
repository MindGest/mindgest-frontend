<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api";
    import TextDisplay from "$lib/components/TextDisplay.svelte";
    import Details from "$lib/components/Details.svelte";
    import Title from "$lib/components/Title.svelte";
    import Button from "$lib/components/Button.svelte";
    import translate from "$lib/utils/translate";

    let data = null;

    const MIGRATE = 'migrate', REGIST = 'register', PROCESS = 'process' 

    onMount(async () => {
        const id = $page.params["id"]
        
        let responseNotification = await api.get(`notification/${id}/info`);
        if (!responseNotification.ok) {
            return alert("Erro ao carregar notificação")
        } 
        data = (await responseNotification.json())["data"];
        data.data = await JSON.parse(data.data);

        if (data.type == REGIST) {
            data.data.role = translate(data.data.role)
        }
        
        if (!data.seen) {
            let markResult = await mark();
            if (!markResult) {
                return alert("Erro ao marcar notificação como vista")
            }
        }

        console.log(data)

    });

    async function accept() {
        let info = data.data;
        switch(data.type) {
            case MIGRATE:
                let responseMigrate = await api.post(`process/${info.processId}/migrate`, {therapistId: info.therapistId});
                if (responseMigrate.ok) {
                    alert("Responsável Alterado")
                } else {
                    alert("Erro ao alterar responsável")
                }
                break;
            case REGIST:
                let responseRegist = await api.put(`user/${info.id}/profile/approve`);
                if (responseRegist.ok) {
                    alert("Conta Aprovada")
                } else {
                    alert("Erro ao aprovar conta")
                }
                break
            case PROCESS:
                let responseProcess = await api.post("process/create", info);
                if (responseProcess.ok) {
                    alert("Processo Aprovado")
                } else {
                    alert("Erro ao aprovar processo")
                }
                break;
        }
        data.settled = await resolve();
    }

    async function reject() {
        data.settled = await resolve();
    }

    async function resolve () {
        const id = $page.params["id"]
        let response = await api.put(`notification/${id}/settle`);
        if (response.ok) {
            return true
        }
        return false
    }

    async function mark() {
        const id = $page.params["id"]
        let responseSeen = await api.put(`notification/${id}/mark`);
        if (!responseSeen.ok) {
            alert("Erro ao Marcar/Desmarcar como vista")
            return false;
        }
        data.seen = !data.seen
        return true;
    }
                
</script>


{#if data != null}
    <div class="grid grid-cols-2">
        <div class="m-5">
            <Title class="mb-5" text="Notificação"/>
            <TextDisplay class="my-2 px-4" label="ID da notificação" value="{data.id}"/>
            <TextDisplay class="my-2 px-4" label="Tipo" value="{translate("notification:" + data.type)}"/>
            <TextDisplay class="my-2 px-4" label="Vista" value="{data.seen ? "Sim": "Não"}"/>
            {#if !data.settled}
                <div class="flex flex-line mt-10">
                    <Button class="w-full px-4" text="Aceitar" on:click={accept}/>
                    <Button class="w-full px-4" text="Rejeitar" on:click={reject}/>
                </div>
            {/if}
            <Button class="w-full my-4 px-4" text={(data.seen ? "Desmarcar" : "Marcar") + " como vista"} on:click={mark}/>
        </div>
        <div class="m-5">
            <Title class="mb-11" text="Dados"/>
            <Details data={data.data}/>
        </div>
    </div>

{/if}


