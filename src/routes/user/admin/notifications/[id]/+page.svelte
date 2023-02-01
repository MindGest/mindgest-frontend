<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import * as api from "$lib/utils/api";

    let data = null;

    const MIGRATE = 'migrate', REGIST = 'regist', PROCESS = 'process' 

    onMount(async () => {
        const id = $page.params["id"]
        
        let responseNotification = await api.get(`notification/${id}/info`);
        if (!responseNotification.ok) {
            return alert("Erro ao carregar notificação")
        } 

        let responseSeen = await api.put(`notification/${id}/mark`);
        if (!responseSeen.ok) {
            return alert("Erro ao carregar notificação")
        }

        data = (await responseNotification.json())["data"];
    });

    async function accept() {
        const info = JSON.parse(data.data)
        
        let response = null;
        switch (data.type) {
            case MIGRATE:
                response = await api.post(`process/${info.processId}/migrate`, {therapistId: info.therapistId})
                break;
            case REGIST:
                response = await api.("user/")
                break;
            case PROCESS:
                break;
        }
    }

    async function reject() {
        switch (data.type) {
            case MIGRATE:
                break;
            case REGIST:
                break;
            case PROCESS:
                break;
        }
    }

    async function resolve () {
        let response = await api.put(`notification/${id}/settle`);
        if (response.ok) {
            return true
        }
        return false
    }
    
</script>


{#if data != null}
    {data.id}
{/if}


