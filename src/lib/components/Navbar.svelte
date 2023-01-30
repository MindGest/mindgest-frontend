<script>
  import { page } from '$app/stores';
  import navbar from '$lib/data/navbar.json';
  import Link from './Link.svelte';

  const role = $page.url.pathname.split('/')[2];
  const buttons = Object.keys(import.meta.glob('/src/routes/user/*/*/+page.svelte'))
    .map(path => path.split('/').slice(4, 6))
    .filter(([role_, page]) => role_ === role && page !== 'profile')
    .sort(([, page1], [, page2]) => navbar.indexOf(page1) - navbar.indexOf(page2))
    .map(([role, page]) => ({ text: page, href: `/user/${role}/${page}` }));
</script>

<nav class="w-full fixed top-0 p-4 flex bg-zinc-50 shadow-sm border border-b-zinc-400">
  <div class="flex items-center space-x-5">
    <img src="/img/logo.png" alt="logo" class="h-12" />
    {#each buttons as { text, href }}
      <Link {href} active={$page.url.pathname.startsWith(href)} {text} />
    {/each}
  </div>
  <div class="ml-auto flex items-center space-x-5">
    <Link
      href="/user/{role}/profile"
      active={$page.url.pathname.startsWith(`/user/${role}/profile`)}
      text="profile"
    />
    <Link href="/auth/logout" text="logout" />
  </div>
</nav>
