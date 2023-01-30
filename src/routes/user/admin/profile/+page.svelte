<script>
    import Profile from "$lib/menus/Profile.svelte";
    export let data; // cookie
</script>

<Profile role={data.role}/>