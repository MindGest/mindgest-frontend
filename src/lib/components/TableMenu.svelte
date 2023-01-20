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
  console.log(filteredData);
  const filter = query => {
    filteredData = data.filter(row =>
      Object.values(row).some(value => value.toLowerCase().includes(query.toLowerCase()))
    );
    console.log(filteredData);
  };
</script>

<SearchBar placeholder={translate('search')} {filter} />
<Table placeholder={translate('empty')} data={filteredData} />
