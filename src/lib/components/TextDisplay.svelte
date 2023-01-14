<script>
    let class_;
    export { class_ as class };
    export let label = '';
    export let value = '';
    export let id = label.toLowerCase();
  </script>
  
  <div class={class_}>
    <label for={id}>{label}</label>
    <input readonly {id} type="text" class="border-2 bg-orange-50 border-orange-500 rounded-lg focus:outline-orange-500 font-normal p-1 m-2" bind:value />
  </div>
  