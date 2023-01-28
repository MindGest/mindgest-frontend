<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let type = 'text';
  export let label = '';
  export let value = '';
</script>

<div class={`flex flex-col ${class_}`}>
  {#if label}
    <label for={label}>{translate(label)}</label>
    <gap class="h-2 w-2" />
  {/if}
  <input
    class="border border-zinc-400 rounded-md bg-zinc-100 focus:outline-orange-200 focus:outline-offset-1 p-2"
    {type}
    {value}
    id={label}
    readonly
  />
</div>

