<script>
  import * as api from '$lib/utils/api';

  let email = 'admin@student.dei.uc.pt';
  let password = '1234';
  const submit = async () => {
    const response = await api.post('auth/login', { email, password });
    if (response.ok) {
      location.reload();
      return;
    }
    alert('Login failed');
  };
</script>

<wrapper class="flex flex-col items-center justify-center h-full">
  <img src="/logo.png" alt="logo" />
  <form class="flex flex-col items-center" on:submit|preventDefault={submit}>
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
</wrapper>
