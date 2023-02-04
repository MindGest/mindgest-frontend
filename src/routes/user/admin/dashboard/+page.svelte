<script>
  import List from '$lib/components/List.svelte';
  import Title from '$lib/components/Title.svelte';
  import formatDate from '$lib/utils/formatDate';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let appointments = [[], []];
  let placeholders = ['A carregar', 'A carregar'];

  onMount(async () => {
    [
      await api.get('appointment/list-appointments-of-the-day'),
      await api.get('appointment/next')
    ].forEach(async (response, index) => {
      if (response.ok) {
        ({ data: appointments[index] } = await response.json());
        console.log(appointments[index]);
        placeholders[index] = 'Sem Consultas';
        return;
      }
      placeholders[index] = 'Erro';
    });
  });

  const format = appointments =>
    appointments.map(
      ({
        appointmentStartTime: start,
        appointmentEndTime: end,
        appointmentRoom: room,
        therapists
      }) => ({
        title: therapists.map(({ name }) => `Dr. ${name}`).join(', '),
        text: `${room}; ${formatDate(start)} - ${formatDate(end)}`
      })
    );
</script>

<div class="grid grid-cols-2 gap-x-5">
  {#each ['Consultas do Dia', 'Consultas a decorrer'] as title, index}
    <div>
      <Title text={title} />
      <List class="mt-5" placeholder={placeholders[index]} data={format(appointments[index])} />
    </div>
  {/each}
</div>
