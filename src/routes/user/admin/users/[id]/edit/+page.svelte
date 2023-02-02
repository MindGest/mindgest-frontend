<script>
<<<<<<< HEAD
    import { page } from "$app/stores";
    import EditProfile from "$lib/menus/EditProfile.svelte";
    const id = $page.params['id'];
</script>

<EditProfile self={false} id={id}/>
=======
  import { page } from '$app/stores';
  import EditProfile from "$lib/menus/EditProfile.svelte";
  import Button from "$lib/menus/Button.svelte";
  const id = $page.params['id'];
</script>

<EditProfile self={false} {id}/>
>>>>>>> 28531c2bf70ff22071a9d83da5b91db34addc378
