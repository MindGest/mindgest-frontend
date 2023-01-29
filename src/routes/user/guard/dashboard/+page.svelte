<script>
  import List from '$lib/components/List.svelte';
  import Title from '$lib/components/Title.svelte';
  import formatDate from '$lib/utils/formatDate';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let listAppointmentsOfTheDay = [];
  let ongoingAppointments = [];
  let placeholder = 'loading';

  let appointments = [];
  onMount(async () => {
    const response = await api.get('appointment/listAppointmentsOfTheDayGuard');
    const { data } = await response.json();
    console.log(data);
    // if (response.ok) {
    //   ({ data: appointments } = await response.json());
    //   placeholder = 'no appointments';
    // }
    // placeholder = 'error';
  });

  // let appointments = [
  //   {
  //     appointmentStartTime: '2023-01-26T15:03:00.000Z',
  //     appointmentEndTime: '2023-01-26T15:30:00.000Z',
  //     appointmentRoom: 'Sala X',
  //     therapists: [{ name: 'Miguel1' }, { name: 'Gabriel1' }],
  //     speciality: 'string'
  //   },
  //   {
  //     appointmentStartTime: '2023-01-26T20:03:00.000Z',
  //     appointmentEndTime: '2023-01-26T20:30:00.000Z',
  //     appointmentRoom: 'Sala X',
  //     therapists: [{ name: 'Miguel2' }, { name: 'Gabriel2' }],
  //     speciality: 'string'
  //   }
  // ];

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
  <div>
    <Title text="appointments of the day" />
    <List class="mt-5" placeholder="no appointments" data={format(appointments)} />
  </div>
  <div>
    <Title text="ongoing appointments" />
    <List class="mt-5" placeholder="no appointments" data={format(appointments)} />
  </div>
</div>
