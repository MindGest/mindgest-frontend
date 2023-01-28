<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/components/TableMenu.svelte';

  const data = [
    {
      patientName: 'Carolina Pereira',
      therapistListing: 'João Silva',
      speciality: 'Psicologia'
    },
    {
      patientName: 'João Silva',
      therapistListing: 'Fátima Valente',
      speciality: 'Terapia Familiar'
    }
  ];
</script>

<TableMenu
  {data}
  id="recordCode"
  add={true}
  select="speciality"
  search={['patientName', 'therapistListing']}
/>
