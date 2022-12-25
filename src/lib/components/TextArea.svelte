<script>
  let class_;
  export { class_ as class };
  export let label = '';
  export let value = '';
  export let id = label.toLowerCase();
</script>

<div class={`flex flex-col ${class_}`}>
  <label for={id}>{label}</label>
  <textarea
    {id}
    type="text"
    class="border border-gray-300 rounded w-full grow mt-2 p-2 resize-none align-top"
    bind:value
  />
</div>
