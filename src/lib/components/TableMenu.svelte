<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Table from '$lib/components/Table.svelte';
  import Button from './Button.svelte';
  import Checkbox from './Checkbox.svelte';
  import SearchBar from './SearchBar.svelte';
  import Selector from './Selector.svelte';

  const path = $page.url.pathname;
  const stem = path.split('/').slice(-1);

  export let data = [];
  export let select = '';
  export let search = [];
  export let check = '';
  export let add = false;
  export let id = '';

  let query = '';
  let selected = '';
  let checked = [true, true];

  $: filtered = data.filter(
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
  <Button on:click={() => goto(`${path}/new`)}>{stem}:add</Button>
{/if}
{#if check}
  <Checkbox label={`${stem}:${check}`} bind:checked={checked[1]} />
  <Checkbox label={`${stem}:!${check}`} bind:checked={checked[0]} />
{/if}
<Table
  placeholder={'empty'}
  data={filtered}
  on:click={({ detail: { row } }) => goto(`${path}/${row[id]}`)}
/>
