<script>
  import Navbar from '$lib/components/Navbar.svelte';
  export let data;
</script>

{#key data.role}
  <Navbar />
{/key}
<wrapper class="block w-full h-[calc(100%-4rem)] p-5 overflow-scroll">
  <slot />
</wrapper>
