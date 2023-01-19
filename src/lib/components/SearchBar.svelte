<script>
  export let placeholder;
  export let query;
  export let filter;
</script>

<input
  class="border-2 border-orange-500 p-1 rounded-lg m-5 focus:outline-orange-200 focus:outline-offset-2"
  type="text"
  {placeholder}
  bind:value={query}
  on:input={() => filter(query)}
/>
