<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let active = false;
  export let href = '';
  export let text = '';
</script>

<div class={class_}>
  <a class={active ? 'text-orange-500 underline underline-offset-4' : ''} {href}>
    {translate(text)}
  </a>
</div>
