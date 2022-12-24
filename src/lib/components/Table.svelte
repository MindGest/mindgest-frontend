<script>
  export let data = [];
  const sort = field => data.sort((a, b) => (a[field] > b[field]) - (b[field] > a[field]));
</script>

<table class="w-full">
  <thead>
    <tr>
      {#each Object.keys(data[0]) as field}
        <th on:click={() => sort(field)}>{field}</th>
      {/each}
    </tr>
  </thead>
  <tbody class="bg-orange-200">
    {#each data as row}
      <tr>
        {#each Object.values(row) as value}
          <td>{value}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
