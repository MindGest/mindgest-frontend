<script>
	// Redirect to /user/therapist/records
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	export let data;
		onMount(() => {
			const specialityTag = window.location.href.split("/").slice(-1)[0];
			goto(`/user/${data.role}/records?speciality=` + specialityTag)
		});
</script>
