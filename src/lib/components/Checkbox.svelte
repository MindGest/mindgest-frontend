<script>
  export let label;
  export let checked = false;
</script>

<label>
  <input class="accent-orange-500 m-5" type="checkbox"  bind:checked={checked}>
  {label}
</label>

