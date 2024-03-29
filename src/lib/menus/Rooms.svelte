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
    appointments: appointmentsRoom
      .map(({ therapists, startDate, endDate }) => ({
        therapists: therapists.map(({ name }) => name),
        slot: `${formatDate(startDate)} - ${formatDate(endDate)}`,
        date: startDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1').slice(0, 10)
      }))
      .map(({ therapists, slot, date }) => ({
        therapists,
        slot,
        date,
        title: therapists.length > 0 ? 'filled slot' : 'empty slot',
        text:
          `${therapists.map(therapist => `Dr. ${therapist}`).join(', ')}` +
          `${therapists.length > 0 ? '\n' : ''}${slot}\n${date}`
      }))
  }));

  $: console.log(data);

  let room, therapist, slot;
  let date = role === 'guard' ? undefined : new Date().toISOString().slice(0, 10);

  $: console.log(date);

  $: filtered = data
    .filter(({ room: room_ }) => !room || room_ === room)
    .map(({ room, appointments }) => ({
      room,
      appointments: appointments.filter(
        ({ therapists, slot: slot_, date: date_ }) =>
          (!therapist || therapists.includes(therapist)) &&
          (!slot || slot_ === slot) &&
          (!date || date_ === date)
      )
    }))
    .filter(({ appointments }) => appointments.length > 0);
  $: console.log(filtered);
</script>

<div class="w-full flex items-stretch space-x-5">
  <Selector
    class="w-full"
    label="room"
    placeholder="every room"
    values={data.map(({ room }) => room)}
    bind:value={room}
  />
  {#if role === 'guard'}
    <Selector
      class="w-full"
      values={[
        ...new Set(
          data.flatMap(({ appointments }) => appointments.flatMap(({ therapists }) => therapists))
        )
      ]}
      label="therapist"
      placeholder="every therapist"
      bind:value={therapist}
    />
    <Selector
      class="w-full"
      values={[
        ...new Set(data.flatMap(({ appointments }) => appointments.map(({ slot }) => slot)))
      ]}
      label="slot"
      placeholder="every slot"
      bind:value={slot}
    />
  {:else}
    <TextBox class="w-full" type="date" label="date" bind:value={date} />
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
