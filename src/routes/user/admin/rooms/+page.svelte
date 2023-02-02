<script>
  import { applyAction } from '$app/forms';
  import Rooms from '$lib/menus/Rooms.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let data;
  onMount(async () => {
    const response = await api.get('rooms/list-rooms');
    ({ message: data } = await response.json());
  });
</script>

<Rooms {data} />
