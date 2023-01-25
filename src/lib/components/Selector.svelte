<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let placeholder = '';
  export let values = [];
  export let value;
  export let label = '';
</script>

<div class={`flex flex-col ${class_}`}>
  {#if label}
    <label for={label}>{translate(label)}</label>
    <gap class="h-2 w-2" />
  {/if}
  <div class="border border-zinc-400 rounded-md bg-zinc-50">
    <select
      class="border-r-8 border-transparent rounded-md bg-transparent focus:outline-orange-200 focus:outline-offset-1 w-full p-2"
      id={label}
      bind:value
    >
      <option value="" disabled selected hidden>{translate(placeholder)}</option>
      {#each values as value}
        <option {value}>{value}</option>
      {/each}
    </select>
  </div>
</div>
