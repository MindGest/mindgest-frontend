<script>
  import { page } from '$app/stores';
  import Profile from '$lib/menus/Profile.svelte';
  const id = $page.params['id'];
</script>

<Profile self={false} {id} />
