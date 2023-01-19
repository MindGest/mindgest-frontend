<script>
  let class_;
  export { class_ as class };
  export let label = '';
  export let value = '';
  export let id = label.toLowerCase();
</script>

<div class={class_}>
  <label for={id}>{label}</label>
  <input
    {id}
    type="text"
    class="border-2 border-orange-500 rounded-lg focus:outline-orange-200 focus:outline-offset-2 font-normal p-1 m-2"
    bind:value
  />
</div>
