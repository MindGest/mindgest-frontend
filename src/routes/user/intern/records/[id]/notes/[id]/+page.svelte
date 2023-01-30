<script>
  import TextDisplay from '$lib/components/TextDisplay.svelte';
  import Button from '$lib/components/Button.svelte';
  import parseDate from '$lib/utils/util.js';
  
  let note={
    title:'primeira consulta',
    desc:'veio ca falar comigo',
    date: new Date()
  }

  function newNote(){
    /* redirect para nova nota */
  }

  function back(){
    /* redirect para a página anterior*/
  }
  
</script>


<h1><b>{note.title}</b></h1>
<br>
<TextDisplay value="{note.desc}"/>
<br>
<h3>Data de criação:</h3>
<p>{parseDate(note.date)}</p>

<wrapper class="block mb-10 p-5 w-[400px]">
    <Button text="Editar Nota" on:click={newNote()}/>
    <Button text="Voltar" on:click={back()}/>
</wrapper>

