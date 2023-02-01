<script>
  import { page } from '$app/stores';
  import List from '$lib/components/List.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import TextBox from '$lib/components/TextBox.svelte';

  const role = $page.url.pathname.split('/')[2];

  export let data = [];

  let room;
  let date;
</script>

<div class="w-full flex space-x-5">
  <Selector placeholder="all rooms" values={data.map(({ room }) => room)} bind:value={room} />
  {#if role === 'guard'}
    <Selector placeholder="all rooms" />
    <Selector placeholder="all rooms" />
  {:else}
    <TextBox type="date" bind:value={date} />
  {/if}
</div>
<div class="mt-5 space-y-5">
  {#if room}
    <List data={data.filter(({ room: room_ }) => room_ === room).pop().appointmentsRoom} />
  {:else}
    {#each data as { room, appointmentsRoom: appointments }}
      <List label={room} data={appointments} />
    {/each}
  {/if}
</div>
