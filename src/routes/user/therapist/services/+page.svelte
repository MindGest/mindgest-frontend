<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/components/TableMenu.svelte';

  const data = [
    {
      specialityName: 'Especialidade A',
      specialityCode: 'EspA',
      description: 'Descrição da especialidade A'
    },
    {
      specialityName: 'Especialidade B',
      specialityCode: 'EspB',
      description: 'Descrição da especialidade B'
    },
    {
      specialityName: 'Especialidade C',
      specialityCode: 'EspC',
      description: 'Descrição da especialidade C'
    }
  ];
</script>

<TableMenu
  {data}
  id="specialityCode"
  add={true}
  search={['specialityName', 'specialityCode', 'description']}
/>
