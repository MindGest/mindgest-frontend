<script>
  // import { onMount } from 'svelte';
  // import * as api from '$lib/utils/api';
  import List from '$lib/components/List.svelte';
  import Title from '$lib/components/Title.svelte';
  import formatDate from '$lib/utils/formatDate';

  // onMount(async () => {
  //   const response = await api.get('appointment/listLastTerminated', {});
  //   if (response.ok) {
  //     let json = await response.json();

  //     let jsonInfo = json['data'];

  //     let infoHelper = [];
  //     for (var i = 0; i < jsonInfo.length; i++) {
  //       let patients = jsonInfo[i]['patients'];
  //       let name = '';

  //       for (var j = 0; j < patients.length; j++) {
  //         name += patients[j]['name'];
  //       }

  //       let end = jsonInfo[i]['appointmentEndTime'];
  //       let date = new Date(end);
  //       let hour = date.getUTCHours();
  //       let minute = date.getUTCMinutes().toString().padStart(2, '0');
  //       let formated = `${hour}h${minute}`;

  //       infoHelper.push({ name: name, end: formated });
  //     }
  //     consultas = infoHelper;
  //     return;
  //   }
  //   status = response.status;
  // });

  let appointments = [
    {
      appointmentStartTime: '2023-01-26T15:03:00.000Z',
      appointmentEndTime: '2023-01-26T15:30:00.000Z',
      appointmentRoom: 'Sala X',
      therapists: [{ name: 'Miguel1' }, { name: 'Gabriel1' }],
      speciality: 'string'
    },
    {
      appointmentStartTime: '2023-01-26T20:03:00.000Z',
      appointmentEndTime: '2023-01-26T20:30:00.000Z',
      appointmentRoom: 'Sala X',
      therapists: [{ name: 'Miguel2' }, { name: 'Gabriel2' }],
      speciality: 'string'
    }
  ];

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

<Title text="appointments of the day" />
<List class="mt-5" placeholder="no appointments" data={format(appointments)} />
