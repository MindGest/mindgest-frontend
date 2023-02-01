<script>
  import TableMenu from '$lib/menus/TableMenu.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let data = null;

  onMount(async () => {
    let response = await api.get('user/list');
    let users = (await response.json())['info'];
    let usersData = [];
    users.forEach(user => {
      usersData.push({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        active: user.active,
        approved: user.approved,
        phone_number: user.phone_number
      });
    });
    data = usersData;
    console.log(data);
  });
</script>

{#if data != null}
  <TableMenu
    {data}
    id="id"
    add={true}
    check={'active'}
    search={['name', 'email', 'address', 'phone_number']}
  />
{/if}
