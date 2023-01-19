<script>
  import TableMenu from '$lib/components/TableMenu.svelte';

  const data = [
    {
      therapistListing: 'João',
      patientName: 'Ana',
      refCode: '1234',
      nextAppointment: '01/01/2021',
      speciality: '01/01/2021'
    },
    {
      therapistListing: 'Pedro',
      patientName: 'António',
      refCode: '1234',
      nextAppointment: '01/01/2021',
      speciality: '01/01/2021'
    }
  ]; // TODO: replace with API call
</script>

<TableMenu {data} />
