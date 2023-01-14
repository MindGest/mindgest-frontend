<script>
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Table from '$lib/components/Table.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
</script>

<div class="m-5">
  <h1><b>Button Component</b></h1>
  <Button class="w-1/4 m-5">Click me</Button>
  <p class="m-10" />

  <h1><b>Card Component</b></h1>
  <Card title="This is the title" subtitle="This is the subtitle" />
  <p class="m-10" />

  <h1><b>Checkbox Component</b></h1>
  <Checkbox label="A simple checkbox" />
  <p class="m-10" />

  <h1><b>SearchBar Component</b></h1>
  <SearchBar />
  <p class="m-10" />

  <h1><b>Table Component</b></h1>
  <Table
    data={[
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ]}
  />
  <p class="m-10" />

  <h1><b>TextArea Component</b></h1>
  <TextArea />
  <p class="m-10" />

  <h1><b>TextBox Component</b></h1>
  <TextBox />
  <p class="m-10" />
</div>
