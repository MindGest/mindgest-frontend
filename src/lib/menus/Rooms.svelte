<script>
  import List from '$lib/components/List.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import Title from '$lib/components/Title.svelte';

  export let data = [];
</script>

<div class="w-full flex space-x-5">
  <Selector placeholder="all rooms" />
  <Selector placeholder="all rooms" />
  <Selector placeholder="all rooms" />
</div>
<div class="mt-5 space-y-5">
  {#each data as { room, appointmentsRoom: appointments }}
    <List label={room} data={appointments} />
  {/each}
</div>
