<script>
  let class_;
  export { class_ as class };
  export let type = 'button';
</script>

<button
  {type}
  class={`text-orange-500 hover:bg-orange-100 w-full  py-2 outline outline-1 rounded ${class_}`}
  on:click
>
  <slot /></button
>
