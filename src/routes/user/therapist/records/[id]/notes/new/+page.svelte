<script>
  import Button from '$lib/components/Button.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import * as api from '$lib/utils/api';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const id = $page.params['id'];

  let title = '';
  let text = '';
  const date = new Date().toISOString().slice(0, 10);

  async function submit() {
    let body = { title: title, body: text };
    const response = await api.post(`process/${id}/createNote`, body);
    if (response.ok) {
      //TODO: FAZER ALGO A DIZER Q FOI MODIFICADO
    } else {
      //TODO: FAZER CENA A DIZER Q HOUVE ERRO
    }
  }
</script>

<form class="flex flex-col h-full p-8" on:submit|preventDefault={submit}>
  <TextBox label="Titulo da Nota" bind:value={title} />
  <TextArea class="mt-2 grow" label="Notas" bind:value={text} />
  <p class="text-gray-700 mt-2">Data de criação: {date}</p>
  <div class="flex mt-3">
    <Button text="Guardar" type="submit" />
    <Button
      text="Cancelar"
      class="ml-4"
      on:click={() =>
        goto(window.location.href.slice(0, window.location.href.length - '/new'.length))}
    />
  </div>
</form>
