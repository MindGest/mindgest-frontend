<script>
  export let placeholder = '';
  export let values = [];
  export let value;
  export let label;
  let class_;
  export {class_ as class};
</script>

<div class={class_}>
  {#if label}
    <label class="m-2">{label}</label>
  {/if}	
  <select
    class="border-2 border-orange-500 rounded-lg focus:outline-orange-200 focus:outline-offset-2 font-normal p-1 m-2"
    bind:value
  >
    <option value="" disabled selected hidden>{placeholder}</option>
    {#each values as value}
      <option {value}>{value}</option>
    {/each}
  </select>
</div>
