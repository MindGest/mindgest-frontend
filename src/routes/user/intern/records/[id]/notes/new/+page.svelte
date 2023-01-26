<script>
    import Button from '$lib/components/Button.svelte';
    import TextBox from '$lib/components/TextBox.svelte';
    import TextArea from '$lib/components/TextArea.svelte';
    import * as api from '$lib/utils/api';
    import { page } from '$app/stores';
    
    const id =$page.params['id'];
  
    let title = '';
    let text = '';
    const date = new Date().toISOString().slice(0, 10);
  
    async function submit() {
      let body = {'title':title, 'body':text};
      const response = await api.post(`process/${id}/createNote`, body);
      if (response.ok) {
        //TODO: FAZER ALGO A DIZER Q FOI MODIFICADO
      } else {
        //TODO: FAZER CENA A DIZER Q HOUVE ERRO
      }
  
    };
    const back = () => alert('Going back');
  </script>
  
  <form class="flex flex-col h-full p-8" on:submit|preventDefault={submit}>
    <TextBox label="Title" bind:value={title} />
    <TextArea class="mt-2 grow" label="Text" bind:value={text} />
    <p class="text-gray-700 mt-2">Data de criação: {date}</p>
    <div class="flex mt-3">
      <Button type="submit">Guardar</Button>
      <Button class="ml-4" on:click={back}>Cancelar</Button>
    </div>
  </form>
  