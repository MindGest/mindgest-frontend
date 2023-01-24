<script>
  import translate from '$lib/utils/translate';

  export let placeholder = '';
  export let value = '';
</script>

<input
  class="border-2 border-orange-500 w-72 p-1 rounded-lg focus:outline-orange-200 focus:outline-offset-2"
  type="text"
  placeholder={translate(placeholder)}
  bind:value
/>
