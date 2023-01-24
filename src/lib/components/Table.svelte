<script>
  import { createEventDispatcher } from 'svelte';
  import translate from '$lib/utils/translate';

  export let placeholder = '';
  export let data = [];

  console.log(data);
  const sort = key => (data = data.sort((a, b) => (a[key] > b[key]) - (b[key] > a[key])));
  const dispatch = createEventDispatcher();
  // TODO: deal with lists, dates
</script>

<table class="w-full border-spacing-y-1 border-separate">
  <thead>
    <tr>
      {#if data.length === 0}
        <th class="text-gray-500 italic font-semibold">{placeholder}</th>
      {:else}
        {#each Object.keys(data[0]) as key}
          <th class="cursor-pointer" on:click={() => sort(key)}>{translate(key)}</th>
        {/each}
      {/if}
    </tr>
  </thead>
  {#if data.length > 0}
    <tbody class="text-center">
      {#each data as row}
        <tr class="cursor-pointer hover:bg-orange-200" on:click={() => dispatch('click', { row })}>
          {#each Object.values(row) as value}
            <td>{value}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  {/if}
</table>
