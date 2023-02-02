<script>
  import { page } from '$app/stores';
  import List from '$lib/components/List.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import formatDate from '$lib/utils/formatDate';

  const role = $page.url.pathname.split('/')[2];

  export let data = [];

  let room, date, therapist, slot;

  $: filteredData = data
    .filter(({ room: room_, appointmentsRoom: appointments }) => !room || room_ === room)
    // .map(({ appointmentsRoom: appointments }) =>
    //   appointments.filter(({ startDate: start, endDate: end, therapists }) =>
    //     !therapist || therapists.includes(therapist)
    //   )
    // );

  // .map(({ startDate, endDate, title }) => ({
  // title,
  //   text: `${formatDate(startDate)} - ${formatDate(endDate)}`
  // }))
</script>

<div class="w-full flex items-stretch space-x-5">
  <Selector
    class="w-full"
    placeholder="select a room"
    values={data.map(({ room }) => room)}
    bind:value={room}
  />
  {#if role === 'guard'}
    <Selector
      class="w-full"
      values={data.map(({ title }) => title)}
      placeholder="select a therapist"
    />
    <Selector
      class="w-full"
      values={data.map(
        ({ startDate, endDate }) => `${formatDate(startDate)}-${formatDate(endDate)}`
      )}
      placeholder="select a slot"
    />
  {:else}
    <TextBox class="w-full" type="date" bind:value={date} />
  {/if}
</div>
<div class="mt-5 space-y-5">
  {#each filteredData as { room: room_, appointmentsRoom: appointments }}
    <List label={room ? '' : room_} data={appointments} />
  {/each}
</div>
