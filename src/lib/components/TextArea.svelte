<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let label = '';
  export let placeholder = '';
  export let value = '';
</script>

<div class={`flex flex-col ${class_}`}>
  {#if label}
    <label for={label}>{translate(label)}</label>
    <gap class="h-2 w-2" />
  {/if}
  <textarea
    class="border border-zinc-400 rounded-md bg-zinc-50 focus:outline-orange-200 focus:outline-offset-1 h-full p-2 resize-none"
    id={label}
    placeholder={translate(placeholder)}
    bind:value
  />
</div>

<!-- <textarea
    {id}
    type="text"
    class="border border-zinc-400 rounded-md bg-zinc-50 focus:outline-orange-200 focus:outline-offset-1 p-2 resize-none"
    bind:value
  /> -->
