<script>
  import * as api from '$lib/utils/api';

  let email = 'admin@student.dei.uc.pt';
  let password = '12345';
  let status = 200;
  
  const submit = async () => {
    const response = await api.post('auth/login', { email, password });
    if (response.ok) {
      location.reload();
      return;
    }
    status = response.status;
  };
</script>

<wrapper class="flex flex-col items-center justify-center h-full">
  <img src="/img/logo.png" alt="logo" />
  <form class="flex flex-col items-center mt-4" on:submit|preventDefault={submit}>
    {#if status !== 200}
      <p class="outline outline-2 rounded-sm p-2 mt-4 outline-red-500">
        {#if status === 401}
          Email ou password incorretos
        {:else}
          Erro desconhecido
        {/if}
      </p>
    {/if}
    <label for="email" class="text-gray-700 mt-8">Email</label>
    <input
      id="email"
      type="email"
      class="border border-gray-300 rounded w-64 p-2 mt-1"
      bind:value={email}
    />
    <label for="password" class="text-gray-700 mt-4">Password</label>
    <input
      id="password"
      type="password"
      class="border border-gray-300 rounded w-64 p-2 mt-1"
      bind:value={password}
    />
    <button type="submit" class="text-orange-400 underline underline-offset-8 w-fit mt-8">
      Entrar
    </button>
  </form>
  <a href="/auth/register" class="text-sm text-black underline underline-offset-8 w-fit mt-10">
    Criar uma nova conta
  </a>
  <a href="/auth/recover" class="text-sm text-black underline underline-offset-8 w-fit mt-4" on:click={() => {}}>
    Esqueci-me da password
  </a>
</wrapper>
