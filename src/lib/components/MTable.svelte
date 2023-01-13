<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let data = [];
  let selected = null;

  const sort = field => data.sort((a, b) => (a[field] > b[field]) - (b[field] > a[field]));

  function forward(data, index) {
    selected = index;
    dispatch('info', {
      myData: data,
      index: index
    });
  }
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
    {#each data as row, index}
      <tr style='cursor: pointer; cursor: hand;' class="hover:bg-orange-200" on:click={forward(row, index)}>
        {#each Object.values(row) as value}
          <td>{value}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
