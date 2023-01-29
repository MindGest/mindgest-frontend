<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/menus/TableMenu.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let data = [];
  onMount(async () => {
    const response = await api.get('http://localhost:3000/api/users');
    const data = await response.json();
    console.log(data);
  });

  // const data = [
  //   {
  //     username: 'Carolina Pereira',
  //     email: 'carolinapereira@uc.pt',
  //     speciality: 'Psicologia'
  //   },
  //   {
  //     username: 'João Silva',
  //     email: 'joaosilva@uc.pt',
  //     speciality: 'Terapia Familiar'
  //   }
  // ];
</script>

<TableMenu {data} id="username" add={true} select="speciality" search={['username', 'email']} />
