<script>
  import Rooms from '$lib/menus/Rooms.svelte';

  let data = [
    {
      room: 'room 1',
      roomId: 0,
      appointmentsRoom: [
        {
          title: 'Dr João Pedro Esp-A',
          id: 0,
          startDate: '2022-12-24T15:03:00.000Z',
          endDate: '2022-12-24T15:03:00.000Z'
        },
        {
          title: 'Dr João Pedro Esp-A',
          id: 0,
          startDate: '2022-12-24T15:03:00.000Z',
          endDate: '2022-12-24T15:03:00.000Z'
        },
        {
          title: 'Dr João Pedro Esp-A',
          id: 0,
          startDate: '2022-12-24T15:03:00.000Z',
          endDate: '2022-12-24T15:03:00.000Z'
        }
      ]
    },
    {
      room: 'room 2',
      roomId: 0,
      appointmentsRoom: [
        {
          title: 'Dr João Pedro Esp-A',
          id: 0,
          startDate: '2022-12-24T15:03:00.000Z',
          endDate: '2022-12-24T15:03:00.000Z'
        }
      ]
    }
  ];
</script>

<Rooms {data} />
