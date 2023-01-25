<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let label = '';
  export let checked = false;
</script>

<div class={class_}>
  <label class="cursor-pointer">
    <input type="checkbox" class="accent-[#ed6f15] mr-1 w-[1.125rem] scale-150 cursor-pointer" bind:checked />
    {translate(label)}
  </label>
</div>
