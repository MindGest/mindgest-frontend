<script>
  import Table from '$lib/components/Table.svelte';
  import translate from '$lib/utils/translate';
  import SearchBar from './SearchBar.svelte';

  export let data = [];
  let filteredData = (data = data.map(row =>
    Object.keys(row).reduce((acc, key) => {
      acc[translate(key)] = row[key]; // TODO: deal with lists, tables
      return acc;
    }, {})
  ));
  const filter = query => {
    filteredData = data.filter(element =>
      Object.values(element).some(value => value.toLowerCase().includes(query.toLowerCase()))
    );
  };
</script>

<SearchBar placeholder={translate('search')} {filter} />
<Table data={filteredData} />
