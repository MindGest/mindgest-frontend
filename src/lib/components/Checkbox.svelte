<script>
  import translate from '$lib/utils/translate';

  let class_;
  export { class_ as class };
  export let label = '';
  export let checked = false;
</script>

<label class={`cursor-pointer ${class_}`}>
  <input type="checkbox" class="accent-orange-500 mr-1 w-[1.125rem] scale-150" bind:checked />
  {translate(label)}
</label>
