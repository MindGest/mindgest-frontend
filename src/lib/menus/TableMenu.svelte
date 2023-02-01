<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Table from '$lib/components/Table.svelte';
  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import translate from '$lib/utils/translate';

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
  let checked = Object.fromEntries(data.map(row => [row[check], true]));

  $: filtered = data.filter(
    row =>
      search.some(key => row[key].toString().toLowerCase().includes(query.toLowerCase())) &&
      (!selected || row[select] === selected) &&
      checked[row[check]]
  );
</script>

<div class="w-full flex">
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
</div>
{#if check}
  <div class="mt-5 flex space-x-5">
    {#each Object.keys(checked) as key}
      <Checkbox label={translate(`${stem}:${key}`)} bind:checked={checked[key]} />
    {/each}
  </div>
{/if}
<Table
  class="mt-5"
  placeholder={'empty'}
  data={filtered}
  on:click={({ detail: row }) => goto(`${path}/${row[id]}`)}
/>
