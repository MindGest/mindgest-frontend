<script>
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';
  import List from '$lib/components/List.svelte';
  import Title from '$lib/components/Title.svelte';
  import formatDate from '$lib/utils/formatDate';

  let appointments = [];
  let placeholder = 'loading';

  onMount(async () => {
    const response = await api.get('appointment/list-appointments-of-the-day');
    if (response.ok) {
      ({ data: appointments } = await response.json());
      placeholder = 'no appointments';
      return;
    }
    placeholder = 'error';
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

<Title text="last appointments" />
<List class="mt-5" {placeholder} data={format(appointments)} />
