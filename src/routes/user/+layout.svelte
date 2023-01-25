<script>
  import translate from '$lib/utils/translate';
  import navbar from '$lib/data/navbar.json';

  export let data;

  const buttons = Object.keys(import.meta.glob('./**/*.svelte'))
    .map(path => path.split('/').slice(1, 4))
    .filter(
      ([role, page, file]) => role === data.role && page !== 'profile' && file === '+page.svelte'
    )
    .sort(([, page1], [, page2]) => navbar.indexOf(page1) - navbar.indexOf(page2))
    .map(([role, page]) => ({ text: translate(page), href: `/user/${role}/${page}` }));
  $: style = href => (href === data.href ? 'text-orange-500 underline underline-offset-4' : '');
</script>

<nav class="w-full fixed top-0 p-4 flex items-center bg-zinc-50 shadow-sm border border-b-zinc-400">
  <img src="/img/logo.png" alt="logo" class="h-12" />
  {#each buttons as { text, href }}
    <a {href} class={`ml-5 ${style(href)}`}>{text}</a>
  {/each}
  <div class="ml-auto">
    <a class={style(`user/${data.role}/profile`)} href={'profile'}>{translate('profile')}</a>
    <a class="ml-5" href="/logout">{translate('logout')}</a>
  </div>
</nav>

<wrapper class="block w-full h-full p-5 pt-[6.25rem]">
  <slot />
</wrapper>
