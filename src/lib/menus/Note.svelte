<script>
  import Button from '$lib/components/Button.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import * as api from '$lib/utils/api';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let data = null;

  onMount(async () => {
    let lastDir = window.location.href.split('/')[window.location.href.split('/').length - 1];
    let processId = parseInt(
      window.location.href.split('/')[window.location.href.split('/').length - 3]
    );
    console.log(window.location.href.split('/')[window.location.href.split('/').length - 3]);
    if (lastDir == 'new') {
      data = {
        new: true,
        processId: processId,
        title: '',
        body: '',
        date: new Date().toISOString().slice(0, 10)
      };
    } else {
      let noteId = parseInt(lastDir);
      let response = await api.get(`process/${processId}/notes/${noteId}`);
      if (response.ok) {
        let noteData = await response.json();
        data = {
          new: false,
          id: noteId,
          processId: processId,
          title: noteData.title,
          body: noteData.body,
          date: noteData.date
        };
      } else {
        alert('Erro ao carregar nota');
      }
    }
    console.log(data.date);
  });

  async function submit() {
    let body = {
      title: data.title,
      body: data.body
    };

    let response = null;
    console.log(data.processId);
    if (data.new) {
      response = await api.post(`process/${data.processId}/notes`, body);
    } else {
      response = await api.put(`process/${data.processId}/notes/${data.id}`, body);
    }

    if (response.ok) {
      alert('Sucesso: Nota guardada ');
    } else {
      alert('Erro ao guardar nota');
    }
  }

  function back() {
    goto(
      window.location.href
        .split('/')
        .slice(0, window.location.href.split('/').length - 1)
        .join('/')
    );
  }
</script>

{#if data != null}
  <form class="flex flex-col h-full p-8" on:submit|preventDefault={submit}>
    <TextBox label="Titulo da Nota" bind:value={data.title} />
    <TextArea class="mt-2 grow" label="Notas" bind:value={data.body} />
    <p class="text-gray-700 mt-2">Data da última alteração: {data.date}</p>
    <div class="flex mt-3">
      <Button text="Guardar" type="submit" />
      <Button text="Cancelar" class="ml-4" on:click={back} />
    </div>
  </form>
{/if}
