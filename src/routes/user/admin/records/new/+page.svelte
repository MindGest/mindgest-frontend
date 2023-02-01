<script>
  import NewProcess from '$lib/menus/NewProcess.svelte';
  export let data; // cookie
</script>

<NewProcess role={data.role} />
