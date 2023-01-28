<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Table from '$lib/components/Table.svelte';
  import Button from '../components/Button.svelte';
  import Checkbox from '../components/Checkbox.svelte';
  import SearchBar from '../components/SearchBar.svelte';
  import Selector from '../components/Selector.svelte';

  const path = $page.url.pathname;
  const stem = path.split('/').slice(-1);

  export let data = [];
  export let select = '';
  export let search = [];
  export let check = '';
  export let add = false;
  export let id = '';
  export let selected = '';

  let query = '';
  let checked = [true, true];
  $: filtered = data.filter(
    row =>
      search.some(key => row[key].toString().toLowerCase().includes(query.toLowerCase())) &&
      (!selected || row[select] === selected) &&
      (!check || checked[+row[check]])
  );
</script>

<wrapper class="w-full flex">
  {#if select}
    <Selector
      class="w-80 mr-5"
      placeholder={'search'}
      values={[...new Set(data.map(row => row[select]))]}
      bind:value={selected}
    />
  {/if}
  <SearchBar class="w-full" placeholder={'search'} bind:value={query} />
  {#if add}
    <Button class="w-80 ml-5" text="{stem}:add" on:click={() => goto(`${path}/new`)} />
  {/if}
</wrapper>
{#if check}
  <wrapper class="mt-5 flex">
    <Checkbox label={`${stem}:${check}`} bind:checked={checked[1]} />
    <Checkbox class="ml-5" label={`${stem}:!${check}`} bind:checked={checked[0]} />
  </wrapper>
{/if}
<Table
  class="mt-5"
  placeholder={'empty'}
  data={filtered}
  on:click={({ detail: row }) => goto(`${path}/${row[id]}`)}
/>