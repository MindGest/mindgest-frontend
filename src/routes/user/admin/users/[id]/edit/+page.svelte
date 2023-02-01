<script>
  import { page } from '$app/stores';
  import EditProfile from "$lib/menus/EditProfile.svelte";
  import Button from "$lib/menus/Button.svelte";
  const id = $page.params['id'];
</script>

<EditProfile self={false} {id}/>