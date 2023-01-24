<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/components/TableMenu.svelte';

  const data = [
    {
      therapistListing: ['João'],
      patientName: 'Ana',
      refCode: '1234',
      nextAppointment: '01/01/2021',
      speciality: 'Terapia de casal',
      active: true
    },
    {
      therapistListing: ['Pedro', 'João'],
      patientName: 'António',
      refCode: '1234',
      nextAppointment: '01/01/2021',
      speciality: 'Terapia de casal',
      active: false
    }
  ];
</script>

<TableMenu
  {data}
  object="record"
  id="refCode"
  add={true}
  search={['therapistListing', 'patientName', 'refCode']}
  select="speciality"
  check="active"
/>
