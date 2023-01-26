<script>
    import TableMenu from '$lib/components/TableMenu.svelte';
    import { onMount } from 'svelte';
    import * as api from '$lib/utils/api';
    import { page } from '$app/stores';
    
    const id =$page.params['id'];
  
    let data = [];
  
    onMount(async () => {
      const response = await api.get(`process/${id}/listNotes`, {});
      if (response.ok) {
        let json = await response.json();
  
        let jsonInfo = json['message'];
        data = jsonInfo;
  
        return;
      }
      status = response.status;
    });
  </script>
  
  <TableMenu {data} id="title" add={true} search={['title']} />
  