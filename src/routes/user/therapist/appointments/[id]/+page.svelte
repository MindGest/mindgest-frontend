<script>
  import TextDisplay from '$lib/components/TextDisplay.svelte';
  import Button from '$lib/components/Button.svelte';

  let ap = {
    terp: 'João Pedro',
    proc: 'EspA3',
    esp: 'Especialidade A',
    col: ["Ana", "Maria"],
    ut: 'Manuel Pedro',
    beg: 9,
    end: 12,
    room: "Sala X"
  };

  function getCol(){
    let out = '';

    for (let i = 0; ap.col.length > i; i++) {
      if (i === 0) out += ap.col[i];
      else out += ', ' + ap.col[i];
    }

    return out;
  }

  function done(){
    /* efetivar a consulta */
  }

  function goToNotes(){
    /* redireciona para o ecrã das notas */
  }

  function back(){
    /* voltar ao menu de pesquisa */
  }

</script>

<wrapper class="flex flex-col" style="margin:50px; float:left; width:50%; position:relative; top:10%">
    <div class="my-5">
      <TextDisplay label="Profissional Responsável:" value={ap.terp} class="grid grid-cols-3 items-center font-bold"/>
    </div>
    <div class="my-5">
      <TextDisplay label="Processo:" value={ap.proc} class="grid grid-cols-3 items-center font-bold"/>
    </div>
    <div class="my-5">
      <TextDisplay label="Especialidade:" value={ap.esp} class="grid grid-cols-3 items-center font-bold"/>
    </div>
    <div class="my-5">
      <TextDisplay label="Colaboradores:" value={getCol()} class="grid grid-cols-3 items-center font-bold"/>
    </div>
    <div class="my-5">
      <TextDisplay label="Utente:" value={ap.ut} class="grid grid-cols-3 items-center font-bold"/>
    </div>
    <div class="my-5">
      <TextDisplay label="Hora da Consulta:" value="{ap.beg}h" class="grid grid-cols-3 items-center font-bold"/>
    </div>
    <div class="my-5">
      <TextDisplay label="Hora prevista de término:" value="{ap.end}h" class="grid grid-cols-3 items-center font-bold"/>
    </div>
    <div class="my-5">
      <TextDisplay label="Espaço:" value={ap.room} class="grid grid-cols-3 items-center font-bold"/>
    </div>
</wrapper>

<wrapper class="flex flex-col" style="float:right; width:20%; position:relative; top:90%; bottom:10%; right:10%">
    {#if (new Date).getHours() > ap.beg}
        <Button text="Efetivar Consulta" on:click={done()}/>
    {/if}
    <Button text="Ver Notas" on:click={goToNotes()}/>
    <Button text="Voltar ao Menu de Pesquisa" on:click={back()}/>
</wrapper>