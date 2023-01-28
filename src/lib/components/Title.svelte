<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let text;
</script>

<div class={class_}><h1 class="text-xl font-bold">{translate(text)}</h1></div>
