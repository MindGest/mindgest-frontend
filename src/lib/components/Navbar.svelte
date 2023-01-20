<script>
  export let buttons = [];
  export let href = '';
  const style = href_ => (href_ === href ? 'text-orange-500 underline underline-offset-4' : '');
</script>

<nav class="w-full fixed top-0 p-4 flex items-center shadow-md bg-white">
  <img src="/img/logo.png" alt="logo" class="h-12" />
  {#each buttons as { text, href }}
    <a {href} class={`ml-5 ${style(href)}`}>{text}</a>
  {/each}
  <div class="ml-auto">
    <a {href} class={`ml-5 ${style(href)}`}>{text}</a>
      <a {href} class={`ml-5 ${style(href)}`}>{text}</a>
    {/each}
  </div>
</nav>
