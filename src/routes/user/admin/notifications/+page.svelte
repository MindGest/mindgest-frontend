<script>
    import TableMenu from "$lib/menus/TableMenu.svelte";
    import * as api from "$lib/utils/api"
    import translate from "$lib/utils/translate";
    import { onMount } from "svelte";
    
    let data = null;

    onMount(async () => {
        let response = await api.get("notification/list");
        if (response.ok) {
            let notifications = (await response.json())["data"]

            console.log(notifications)
            let tableData = []
            notifications.forEach(notification => {
                tableData.push({
                    "id": notification.id,
                    "date": notification.datetime.slice(0, 10),
                    "type": translate(notification.type),
                    "seen":  translate("seen:" + notification.seen),
                    "settled": translate("settled:" + notification.seen),
                })
            });
            data = tableData
        } else {
            alert("Erro ao carregar notificações")
        }
    });
</script>

{#if data != null}
    <TableMenu
        {data}
        id="id"
        check="seen"
        search={['type', 'seen', 'settled', 'date', 'id']}
    />
{/if}

