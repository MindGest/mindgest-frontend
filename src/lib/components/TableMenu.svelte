<script>
  import Table from '$lib/components/Table.svelte';
  import translate from '$lib/utils/translate';
  import Checkbox from './Checkbox.svelte';
  import SearchBar from './SearchBar.svelte';
  import Selector from './Selector.svelte';

  export let data = [];
  export let select = '';
  export let search = [];
  export let check = '';

  let query = '';
  let selected = '';
  let checked = [true, true];

  $: filteredData = data
    .filter(
      row =>
        search.some(key => row[key].toString().toLowerCase().includes(query.toLowerCase())) &&
        (selected === '' || row[select] === selected) &&
        checked[+row[check]]
    )
    .map(row =>
      Object.entries(row).reduce((acc, [key, value]) => ({ ...acc, [translate(key)]: value }), {})
    );
</script>

{#if select}
  <Selector
    placeholder={translate('search')}
    values={[...new Set(data.map(row => row[select]))]}
    bind:value={selected}
  />
{/if}
<SearchBar placeholder={translate('search')} bind:value={query} />
{#if check}
  <Checkbox label={check} bind:checked={checked[1]} />
  <Checkbox label={`not ${check}`} bind:checked={checked[0]} />
{/if}
<Table placeholder={translate('empty')} data={filteredData} />
