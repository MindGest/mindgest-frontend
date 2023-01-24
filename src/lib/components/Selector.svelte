<script>
  import translate from '$lib/utils/translate';

  let class_;
  export { class_ as class };
  export let placeholder = '';
  export let values = [];
  export let value;
  export let label;
</script>

<div class={`flex flex-col ${class_}`}>
  {#if label}
    <label class="mb-2" for={label}>{translate(label)}</label>
  {/if}
  <select
    id={label}
    class="border-2 border-orange-500 rounded-lg focus:outline-orange-200 focus:outline-offset-2 font-normal p-1"
    bind:value
  >
    <option value="" disabled selected hidden>{translate(placeholder)}</option>
    {#each values as value}
      <option {value}>{value}</option>
    {/each}
  </select>
</div>
