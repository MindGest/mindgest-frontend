<script>
  import { page } from '$app/stores';
  import List from '$lib/components/List.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import formatDate from '$lib/utils/formatDate';
  import translate from '$lib/utils/translate';

  const role = $page.url.pathname.split('/')[2];

  export let data = [];

  $: data = data.map(({ room, appointmentsRoom }) => ({
    room,
    appointments: appointmentsRoom.map(({ startDate, endDate, title, therapists }) => ({
      title: title === 'empty' ? 'empty slot' : title,
      text: `${formatDate(startDate)} - ${formatDate(endDate)}`,
      therapists,
      date: startDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1').slice(0, 10)
    }))
  }));

  $: console.log(data);

  let room, therapist, slot;
  let date = new Date().toISOString().slice(0, 10);

  $: console.log(date);

  $: filtered = data
    .filter(({ room: room_ }) => !room || room_ === room)
    .map(({ room, appointments }) => ({
      room,
      appointments: appointments.filter(
        ({ therapists, text, date: date_ }) =>
          (!therapist || therapists.includes(therapist)) &&
          (!slot || text === slot) &&
          date_ === date
      )
    }))
    .filter(({ appointments }) => appointments.length > 0);

  $: console.log(filtered);
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
  {#if data.length === 0}
    <p class="text-gray-500 italic font-semibold">{translate('loading')}</p>
  {:else if filtered.length === 0}
    <p class="text-gray-500 italic font-semibold">{translate('empty')}</p>
  {:else}
    {#each filtered as { room: room_, appointments }}
      <List label={room ? '' : room_} data={appointments} />
    {/each}
  {/if}
</div>
