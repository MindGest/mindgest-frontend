<script>
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Details from '$lib/components/Details.svelte';
  import Link from '$lib/components/Link.svelte';
  import List from '$lib/components/List.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import Table from '$lib/components/Table.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import TextDisplay from '$lib/components/TextDisplay.svelte';
  import Title from '$lib/components/Title.svelte';

  let query = '';
  let text = '';
  let checked = false;
  let selected = '';
  let email = '';
  let password = '';
</script>

<wrapper class="block mb-10 p-5 w-[400px]">
  <Title class="mb-5" text="TextBox" />
  <TextBox placeholder="placeholder" />
  <TextBox class="mt-2" label="name" />
  <TextBox class="mt-2" type="number" label="number" />
  <TextBox class="mt-2" type="password" label="password" />
  <TextBox class="mt-2" type="date" label="date" />

  <Title class="my-5" text="TextArea" />
  <TextArea class="h-72" label="big text area" bind:value={text} />
  <div class="mt-5 border border-zinc-400 rounded-md p-2">Text: {text}</div>
  <TextArea class="mt-5" placeholder="small text area" />

  <Title class="my-5" text="SearchBar" />
  <SearchBar placeholder="search" bind:value={query} />
  <div class="mt-5 border border-zinc-400 rounded-md p-2">Query: {query}</div>

  <Title class="my-5" text="Selector" />
  <Selector label="label" values={['one', 'two', 'three']} bind:value={selected} />
  <div class="mt-5 border border-zinc-400 rounded-md p-2">Selected: {selected}</div>
  <Selector class="mt-5" placeholder="all" values={['one', 'two', 'three']} />

  <Title class="my-5" text="Button" />
  <buttons class="flex">
    <Button class="w-full" text="big" on:click={() => alert('big')} />
    <Button class="ml-5" text="small" on:click={() => alert('small')} />
  </buttons>

  <Title class="my-5" text="Link" />
  <Link text="left" on:click={() => alert('left')} />
  <Link class="ml-5" text="right" on:click={() => alert('right')} />

  <Title class="my-5" text="Checkbox" />
  <Checkbox label={checked ? 'uncheck me' : 'check me'} bind:checked />
  <Checkbox class="mt-2" label="already checked" checked />
  <checkboxes class="flex mt-2">
    <Checkbox />
    <Checkbox class="ml-2" />
    <Checkbox class="ml-2" label="i'm the third checkbox" />
  </checkboxes>

  <Title class="my-5" text="Card" />
  {#each [1, 2, 3] as number}
    <Card
      class="mt-5"
      title={`card #${number}`}
      text="try clicking me"
      on:click={() => alert(`card ${number}`)}
    />
  {/each}
  <Card class="mt-5" title="card with no text" />
  <Card class="mt-5" text="card with no title" />

  <Title class="my-5" text="List" />

  <List placeholder="empty list" />
  <List
    class="mt-5"
    data={[
      { title: 'Appointment 1', text: 'Room 1 (11:00)' },
      { title: 'Appointment 2', text: 'Room 2 (12:00)' },
      { title: 'Appointment 3', text: 'Room 3 (14:30)' }
    ]}
    on:click={({ detail: index }) => alert(index)}
  />

  <Title class="my-5" text="Table" />
  <Table placeholder="empty table" />
  <Table
    class="mt-5"
    data={[
      { code: 1, name: 'Alice', age: 25 },
      { code: 2, name: 'Bob', age: 30 },
      { code: 3, name: 'Charlie', age: 35 }
    ]}
    on:click={({ detail: row }) => alert(Object.values(row).join(', '))}
  />

  <Title class="my-5" text="Form" />
  <form on:submit|preventDefault={() => alert(`${email}, ${password}`)}>
    <TextBox type="email" label="email" bind:value={email} />
    <TextBox class="mt-2" type="password" label="password" bind:value={password} />
    <TextBox class="mt-2" type="date" label="birth date" />
    <buttons class="flex mt-5">
      <Button class="w-full" text="cancel" />
      <Button class="ml-5 w-full" text="submit" type="submit" />
    </buttons>
  </form>

  <Title class="my-5" text="Text Display" />
  <TextDisplay value="Valor" />

  <Title class="my-5" text="Details" />
  <Details
    data={{
      name: 'John Doe',
      age: 30,
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    }}
  />
</wrapper>
