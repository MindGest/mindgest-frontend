<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Table from '$lib/components/Table.svelte';
  import Button from './Button.svelte';
  import Checkbox from './Checkbox.svelte';
  import SearchBar from './SearchBar.svelte';
  import Selector from './Selector.svelte';

  export let data = [];
  export let select = '';
  export let search = [];
  export let check = '';
  export let object = '';
  export let add = false;
  export let id = '';

  console.log($page.url.pathname);

  let query = '';
  let selected = '';
  let checked = [true, true];

  $: filteredData = data.filter(
    row =>
      search.some(key => row[key].toString().toLowerCase().includes(query.toLowerCase())) &&
      (selected === '' || row[select] === selected) &&
      checked[+row[check]]
  );
</script>

{#if select}
  <Selector
    placeholder={'search'}
    values={[...new Set(data.map(row => row[select]))]}
    bind:value={selected}
  />
{/if}
<SearchBar placeholder={'search'} bind:value={query} />
{#if add}
  <Button on:click={() => goto(`${$page.url.pathname}/new`)}>{object}:add</Button>
{/if}
{#if check}
  <Checkbox label={`${object}:${check}`} bind:checked={checked[1]} />
  <Checkbox label={`${object}:!${check}`} bind:checked={checked[0]} />
{/if}
<Table
  placeholder={'empty'}
  data={filteredData}
  on:click={({ detail: { row } }) => goto(`${$page.url.pathname}/${row[id]}`)}
/>
