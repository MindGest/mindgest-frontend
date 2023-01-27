<script>
  import Button from "$lib/components/Button.svelte";
  import TextArea from "$lib/components/TextArea.svelte";
  import TextBox from "$lib/components/TextBox.svelte";

  let name = '';
  let code = '';
  let description = '';

  async function create() {
    alert(`${name}, ${code}, ${description}`);
    //TODO: Integrate (create new specialty)
  }

</script>

<h1 class="text-4xl text-center mt-5 mb-10">Criar nova especialidade</h1>


<form on:submit|preventDefault={async () => { await create()}}>    
    <TextBox class="my-5 w-1/2 m-auto" label="Nome" bind:value={name}/>
    <TextBox class="my-5 w-1/2 m-auto" label="Código" bind:value={code}/>
    <TextArea class="my-5 w-1/2 m-auto" label="Descrição" bind:value={description}/>
    <Button class="my-10 w-1/2 m-auto" type="submit" text="Criar"/>
</form>
<a class="block text-center text-orange-500 underline" href="/user/therapist/services">Voltar ao menu de serviços</a>