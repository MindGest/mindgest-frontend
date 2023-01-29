<script>
  // import { goto } from '$app/navigation';
  import TableMenu from '$lib/menus/TableMenu.svelte';
  // import { onMount } from 'svelte';
  // import * as api from '$lib/utils/api';

  // onMount(async () => {
  //   const response = await api.get('speciality/list');

  //   if (response.ok) {
  //     let json = await response.json();

  //     let jsonInfo = json['data'];
  //     data = jsonInfo; //SE EU RETORNAR O ATIVO NAO ATIVO DA MERDA QND TIVERES DADO FIX DIZ Q EU ALTERO NO BACKEND

  //     return;
  //   }
  //   status = response.status;
  // });

  let services = [
    { speciality: 'Fisioterapia', code: 'FISIO', description: 'Fisioterapia geral' },
    { speciality: 'Fisioterapia', code: 'FISIO', description: 'Fisioterapia geral' },
    { speciality: 'Fisioterapia', code: 'FISIO', description: 'Fisioterapia geral' },
    { speciality: 'Fisioterapia', code: 'FISIO', description: 'Fisioterapia geral' }
  ];
</script>

<TableMenu
  data={services}
  id="speciality"
  add={true}
  search={['speciality', 'code', 'description']}
/>
