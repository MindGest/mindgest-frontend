<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let title = '';
  export let text = '';
</script>

<div class={class_}>
  <button class={`border border-zinc-400 rounded-md bg-zinc-50 hover:bg-zinc-200 w-full p-3`} on:click>
    <div class="grid justify-items-start">
      <h1 class="font-bold">{translate(title)}</h1>
      <p>{translate(text)}</p>
    </div>
  </button>
</div>
