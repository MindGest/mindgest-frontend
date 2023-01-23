<script>
    let class_;
    export { class_ as class };
</script>
  
<button class={'text-orange-500 red w-full py-2 outline outline-1 rounded ' + class_} on:click>
<slot />
</button>