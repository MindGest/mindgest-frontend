<script>
  let class_ = '';
  export { class_ as class };
  export let src, id;
  if (src == null) {
    src = "/img/logo.png"
  }
</script>

<img
  {id}
  {src}
  alt="logo"
  class=" p-1 aspect-square rounded-full {class_} ring-2 ring-orange-500"
/>
