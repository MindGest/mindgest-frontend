<script>
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';
  import List from '$lib/components/List.svelte';
  import Title from '$lib/components/Title.svelte';
  import formatDate from '$lib/utils/formatDate';

  let appointments = [];
  let placeholder = 'loading';

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

  onMount(async () => {
    const response = await api.get('appointment/listLastTerminated');
    if (response.ok) {
      ({ data: appointments } = await response.json());
      placeholder = 'no appointments';
    }
    placeholder = 'error';
  });
</script>

<Title text="appointments of the day" />
<List class="mt-5" placeholder="no appointments" data={format(appointments)} />
