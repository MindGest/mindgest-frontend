<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let text;
</script>

<div class={class_}><h1 class="text-2xl">{translate(text)}</h1></div>
