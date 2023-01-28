<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/components/TableMenu.svelte';

  const data = [
    {
      username: 'Carolina Pereira',
      email: 'carolinapereira@uc.pt',
      speciality: 'Psicologia'
    },
    {
      username: 'João Silva',
      email: 'joaosilva@uc.pt',
      speciality: 'Terapia Familiar'
    }
  ];
</script>

<TableMenu {data} id="username" add={true} select="speciality" search={['username', 'email']} />
