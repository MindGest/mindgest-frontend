<script>
  import Details from "$lib/components/Details.svelte";

  let data={
    record: '',
    room: '',
    start: 0,
    end: 0,
    date: ''
  }

</script>
<Details
    data={data}/>