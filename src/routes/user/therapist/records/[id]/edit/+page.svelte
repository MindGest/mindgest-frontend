<script>
    import EditProcess from "$lib/menus/EditProcess.svelte";
    export let data; // cookie
</script>

<EditProcess role={data.role}/>