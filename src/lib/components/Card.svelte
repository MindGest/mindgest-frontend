<script>
  export let title;
  export let subtitle;
</script>

<button class="border-2 border-slate-500 p-5 rounded-lg w-1/2 m-2" on:click>
  <div class="grid justify-items-start">
    <h1 class="font-bold">{title}</h1>
    <h1>{subtitle}</h1>
    <slot />
  </div>
</button>
