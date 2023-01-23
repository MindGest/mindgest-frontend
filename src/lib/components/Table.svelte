<script>
  export let placeholder = '';
  export let data = [];
  
  const sort = column => data.sort((a, b) => (a[column] > b[column]) - (b[column] > a[column]));
  // TODO: deal with lists, tables
</script>

<table class="w-full border-spacing-y-1 border-separate">
  <thead>
    <tr>
      {#if data.length === 0}
        <th class="text-gray-500 italic font-semibold">{placeholder}</th>
      {:else}
        {#each Object.keys(data[0]) as column}
          <th on:click={() => sort(column)}>{column}</th>
        {/each}
      {/if}
    </tr>
  </thead>
  {#if data.length > 0}
    <tbody class="text-center">
      {#each data as row}
        <tr style="cursor: pointer; cursor: hand;" class="hover:bg-orange-200">
          {#each Object.values(row) as value}
            <td>{value}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  {/if}
</table>
