<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/components/TableMenu.svelte';

  const data = [
    {
      patientName: 'Ana',
      therapistListing: ['João'],
      appointmentCode: 'adjkasdas',
      appointmentDate: '01/01/2021',
      paid: true
    },
    {
      patientName: 'António',
      therapistListing: ['Pedro', 'João'],
      appointmentCode: 'kiwkdfofi',
      appointmentDate: '01/01/2021',
      paid: false
    }
  ];
</script>

<TableMenu
  {data}
  object="payment"
  id="appointmentCode"
  add={false}
  search={['patientName', 'therapistListing', 'appointmentCode']}
  check="paid"
/>
