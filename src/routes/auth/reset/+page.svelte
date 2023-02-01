<script>
  import Button from '$lib/components/Button.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { onMount } from 'svelte';
  let password = '';
  let confirm = '';

  async function resetPassword(password, confirm) {
    alert(`${password}, ${confirm}`);
    //TODO: Integrate
  }

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    //TODO: integrate
    console.log('Token: ' + token);
  });
</script>

<div class="block justify-items-center text-center m-10">
  <h1 class="text-4xl font-bold m-10">Alterar Password</h1>
  <form on:submit|preventDefault={async () => await resetPassword(password, confirm)}>
    <TextBox class="w-1/3 my-5 m-auto" label="password" bind:value={password} />
    <TextBox class="w-1/3 my-5 m-auto" label="Confirmar password" bind:value={confirm} />
    <Button class="w-1/3 my-20 m-auto" text="submit" type="submit" />
  </form>
</div>
