<script>
  export let label;
  export let checked = false;
  export let filter;
</script>

<label>
  <input
    class="accent-orange-500 m-5"
    type="checkbox"
    bind:checked
    on:change={() => filter(label)}
  />
  {label}
</label>
