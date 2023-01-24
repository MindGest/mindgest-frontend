<script>
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import Table from '$lib/components/Table.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import TextBox from '$lib/components/TextBox.svelte';

  let query = '';
</script>

<wrapper class="block mb-10 p-5">
  <h1>Button</h1>
  <Button class="w-1/4 m-5">Click me</Button>
  <h1>Card</h1>
  <Card title="This is the title" subtitle="This is the subtitle" />
  <h1>Checkbox</h1>
  <Checkbox label="A simple checkbox" />
  <h1>SearchBar</h1>
  <SearchBar placeholder="search" bind:value={query}/>
  <p>Query: {query}</p>
  <h1>Table</h1>
  <Table
    data={[
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ]}
  />
  <h1>TextArea</h1>
  <TextArea />
  <h1>TextBox</h1>
  <TextBox />
  <h1>Selector</h1>
  <h2>Labeled</h2>
  <Selector label="label" placeholder="search" values={['one', 'two', 'three']} />
  <h2>Unlabeled</h2>
  <Selector placeholder="search" values={['one', 'two', 'three']} />
</wrapper>

<style>
  h1 {
    @apply text-2xl;
  }

  h1:not(:first-child) {
    @apply my-5;
  }

  h2 {
    @apply text-xl my-4;
  }
</style>
