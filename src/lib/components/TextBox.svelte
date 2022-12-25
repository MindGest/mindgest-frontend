<script>
  export let name = '';
  export let value = '';
  const id = name.toLowerCase();
</script>

<label for={id} class="text-gray-700">{name}</label>
<input {id} type="text" class="border border-gray-300 rounded w-64 p-2" bind:value />
