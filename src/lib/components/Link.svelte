<script>
  import translate from '$lib/utils/translate';

  let class_;
  export { class_ as class };
  export let text = '';
</script>

<button class={`text-orange-500 underline underline-offset-4 ${class_}`} {text} on:click>
  {translate(text)}
</button>
