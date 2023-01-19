<script>
  export let data = [];
  const sort = field => data.sort((a, b) => (a[field] > b[field]) - (b[field] > a[field]));
</script>

<table class="w-full border-spacing-y-1 border-separate">
  <thead>
    <tr>
      {#each Object.keys(data[0]) as field}
        <th on:click={() => sort(field)}>{field}</th>
      {/each}
    </tr>
  </thead>
  <tbody class="text-center">
    {#each data as row}
      <tr style="cursor: pointer; cursor: hand;" class="hover:bg-orange-200">
        {#each Object.values(row) as value}
          <td>{value}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
