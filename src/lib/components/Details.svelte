<script>
  import translate from '$lib/utils/translate';

  let class_ = '';
  export { class_ as class };
  export let data = [];
</script>

<div class={class_}>
  <div class="space-y-2">
    {#each Object.entries(data) as [key, value]}
      <p><span class="font-bold">{translate(key)}</span>: {value}</p>
    {/each}
  </div>
</div>
