<script>
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Link from '$lib/components/Link.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import Table from '$lib/components/Table.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import TextBox from '$lib/components/TextBox.svelte';

  let query = '';
  let text = '';
  let checked = false;
  let email = '';
  let password = '';
</script>

<wrapper class="block mb-10 p-5 w-[400px]">
  <h1>TextBox</h1>
  <TextBox placeholder="placeholder" />
  <TextBox class="mt-2" label="name" />
  <TextBox class="mt-2" type="number" label="number" />
  <TextBox class="mt-2" type="password" label="password" />

  <h1>TextArea</h1>
  <TextArea class="h-72" label="big text area" bind:value={text}/>
  <TextArea class="mt-5"/>
  <div class="mt-5 border border-zinc-400 rounded-md p-2">Text: {text}</div>

  <h1>SearchBar</h1>
  <SearchBar placeholder="search" bind:value={query} />
  <div class="mt-5 border border-zinc-400 rounded-md p-2">Query: {query}</div>

  <h1>Button</h1>
  <buttons class="flex">
    <Button class="w-full" text="big" on:click={() => alert('big')} />
    <Button class="ml-5" text="small" on:click={() => alert('small')} />
  </buttons>

  <h1>Link</h1>
  <Link text="left" on:click={() => alert('left')} />
  <Link class="ml-5" text="right" on:click={() => alert('right')} />

  <h1>Checkbox</h1>
  <Checkbox label={checked ? 'uncheck me' : 'check me'} bind:checked />
  <Checkbox class="mt-2" label="already checked" checked />
  <checkboxes class="flex mt-2">
    <Checkbox />
    <Checkbox class="ml-2" />
    <Checkbox class="ml-2" label="i'm the third checkbox" />
  </checkboxes>

  <h1>Table</h1>
  <Table
    data={[
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ]}
  />



  <h1>Selector</h1>
  <h2>Labeled</h2>
  <Selector label="label" placeholder="search" values={['one', 'two', 'three']} />
  <h2>Unlabeled</h2>
  <Selector placeholder="search" values={['one', 'two', 'three']} />

  <h1>Form</h1>
  <form class="w-72" on:submit|preventDefault={() => alert(`${email}, ${password}`)}>
    <TextBox type="email" label="email" bind:value={email} />
    <TextBox class="mt-2" type="password" label="password" bind:value={password} />
    <Button class="mt-5 w-full" text="submit" type="submit" />
  </form>

  <h1>Card</h1>
  <Card title="This is the title" subtitle="This is the subtitle" />
</wrapper>

<style>
  h1 {
    @apply text-2xl mb-5;
  }

  h1:not(:first-child) {
    @apply mt-5;
  }

  h2 {
    @apply text-xl my-4;
  }
</style>
