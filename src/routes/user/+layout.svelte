<script>
  export let data;

  const buttons = Object.keys(import.meta.glob('./**/*.svelte'))
    .map(path => path.split('/').slice(1, 3))
    .filter(path => path[0] === data.role)
    .map(path => ({
      title: `${path[1][0].toUpperCase()}${path[1].slice(1)}`,
      href: `/user/${path.join('/')}`
    }))
    .filter(obj => obj.title !== "Profile");    //FIXME
  $: style = href =>
    href === data.href ? 'text-orange-500 underline underline-offset-4' : '';
</script>

<nav class="w-full fixed top-0 p-4 flex items-center shadow-md bg-white">
  <img src="/logo.png" alt="logo" class="h-12" />
  {#each buttons as { title, href }}
    <a {href} class={`ml-5 ${style(href)}`}>{title}</a>
  {/each}
  <div class="ml-auto">
    <!-- <a class={style('/user/profile')} href="/user/profile">Perfil</a> -->
    <a class={style('/user/profile')} href={buttons[0].href.split("/").slice(0,3).join("/") + "/profile"}>Perfil</a> <!--FIXME-->
    <a class="ml-5" href="/logout">Sair</a>
  </div>
</nav>

<wrapper class="block w-full h-full pt-20">
  <slot />
</wrapper>
