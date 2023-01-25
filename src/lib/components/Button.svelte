<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let type = 'button';
  export let text = '';
</script>

<div class={class_}>
  <button
    class="text-orange-500 hover:bg-orange-200 red p-2 outline outline-1 rounded w-full"
    {type}
    {text}
    on:click
  >
    {translate(text)}
  </button>
</div>
