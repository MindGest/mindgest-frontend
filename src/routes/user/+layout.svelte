<script>
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />
<wrapper class="block w-full h-[calc(100%-4rem)] p-5 overflow-scroll">
  <slot />
</wrapper>
