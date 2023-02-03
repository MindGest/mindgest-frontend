<script>
  import Appointment from "$lib/menus/Appointment.svelte";
  export let data;
</script>
<Appointment role={data.role}/>