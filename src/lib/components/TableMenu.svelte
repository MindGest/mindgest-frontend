<script>
  import Table from '$lib/components/Table.svelte';
  import translate from '$lib/utils/translate';
  import Checkbox from './Checkbox.svelte';
  import DatePicker from './DatePicker.svelte';
  import SearchBar from './SearchBar.svelte';
  import Selector from './Selector.svelte';

  export let data = [];
  export let columns = [];

  data = data.map(row => columns.reduce((acc, { key }) => ({ ...acc, [key]: row[key] }), {}));

  let query = '';

  $: filteredData = data.filter(row =>
    columns.some(
      ({ search, key }) => search && row[key].toString().toLowerCase().includes(query.toLowerCase())
    )
  );
</script>

<SearchBar placeholder={translate('search')} bind:value={query} />
{#each columns as { type, filter }}
  {#if filter}
    {#if type === String}
      <Selector />
    {:else if type === Date}
      <DatePicker />
    {:else if type === Boolean}
      <Checkbox />
    {/if}
  {/if}
{/each}
<Table placeholder={translate('empty')} data={filteredData} />
