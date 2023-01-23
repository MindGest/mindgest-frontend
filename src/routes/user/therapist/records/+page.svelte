<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/components/TableMenu.svelte';

  const columns = [
    { key: 'therapistListing', type: String, search: true, filter: false },
    { key: 'patientName', type: String, search: true, filter: false },
    { key: 'refCode', type: String, search: true, filter: false },
    { key: 'nextAppointment', type: Date, search: false, filter: false },
    { key: 'speciality', type: String, search: false, filter: true }
  ];
  const data = [
    {
      therapistListing: ['João'],
      patientName: 'Ana',
      refCode: '1234',
      nextAppointment: '01/01/2021',
      speciality: "Terapia de casal",
      lol: true
    },
    {
      therapistListing: ['Pedro', 'João'],
      patientName: 'António',
      refCode: '1234',
      nextAppointment: '01/01/2021',
      speciality: 'Terapia de casal',
      lol: false,
    }
  ];
</script>

<TableMenu
  {data}
  search={['therapistListing', 'patientName', 'refCode']}
  select={'speciality'}
  check={'lol'}
/>
