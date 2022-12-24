<script>
  import Table from '$lib/components/Table.svelte';
</script>

<div class="w-96">
  <Table
    data={[
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ]}
  />
</div>
