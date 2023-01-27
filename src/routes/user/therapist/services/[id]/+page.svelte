
<script>
  // Redirect to /user/therapist/records
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

    onMount(() => {
        const specialityTag = window.location.href.split("/").slice(-1)[0];
        goto("/user/therapist/records?speciality=" + specialityTag)
    });
</script>