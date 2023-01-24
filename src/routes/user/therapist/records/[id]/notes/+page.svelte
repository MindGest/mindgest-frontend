<script>
  import TableMenu from '$lib/components/TableMenu.svelte';

  const data = [
    { date: '01/20/2012', title: 'jdioasjdioasjd' },
    { date: '01/20/2012', title: 'jaiosjdoias' }
  ];
</script>

<TableMenu {data} id="title" add={true} search={['title']} />
