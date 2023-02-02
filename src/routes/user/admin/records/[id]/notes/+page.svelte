<script>
  import ListNotes from '$lib/menus/ListNotes.svelte';
  export let data;
</script>

<ListNotes role={data.role} />
