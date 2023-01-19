<script>
  let class_;
  export let options = [];
  export let display_func = a => a;
  export let index = 0;
  export let value;
  export let id;
  export let label = '';
  export { class_ as class };

  $: {
    value = options[index];
    console.log(value);
  }
</script>

<div class={class_}>
  <label for={id}>{label}</label>
  <select
    {id}
    class="border-2 border-orange-500 rounded-lg focus:outline-orange-200 focus:outline-offset-2 font-normal p-1 m-2"
    bind:value={index}
  >
    {#each options as option, i}
      <option value={i}>{display_func(option)}</option>
    {/each}
  </select>
</div>
