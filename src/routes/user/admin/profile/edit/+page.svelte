<script>
  import EditProfile from '$lib/menus/EditProfile.svelte';
  export let data; // cookie
</script>

<EditProfile role={data.role} />
