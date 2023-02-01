<script>
  import TextBox from '$lib/components/TextBox.svelte';
  import Button from '$lib/components/Button.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import { parseDate } from '$lib/utils/util';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  /* PARA DEBUGGG*/
  let proc = ['Proc1', 'Proc2', 'Proc3'];
  let rooms = ['s1', 's2', 's3'];

  let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  let new_apoint = {
    proc: '',
    room: '',
    beg: 0,
    end: 0,
    date: ''
  };

  onMount(async () => {
    /* help */

    // obter os processos do terapeuta
    const responseProcesses = api.get('/process/listTherapist', {});
    if (responseProcesses.ok) {
      let json = await responseProcesses.json();
      var list = json['list'];
      for (let i = 0; i < list.length; i++) {
        proc.push({ text: list[i]['refCode'] });
      }
    }

    // obter as salas
  });

  async function addAppointment() {
    /* help */
  }

  $: if (new_apoint.end > 0 && new_apoint.beg >= new_apoint.end) hourAlert();
  const hourAlert = () => {
    new_apoint.end = 0;
    alert('A hora de fim tem que ser superior à hora de início!');
  };
</script>

<div class="flex flex-col justify-center h-auto w-5/6 m-10 p-5 items-stretch">
  <p class="font-normal text-xl">Nova Consulta</p>
  <Selector id="proc" label="Selecione um Processo:" values={proc} bind:value={new_apoint.proc} />
  <br />
  <Selector
    id="beg"
    label="Selecione a hora de início:"
    values={hours}
    bind:value={new_apoint.beg}
  />
  <br />
  <Selector id="end" label="Selecione a hora de fim:" values={hours} bind:value={new_apoint.end} />
  <br />
  {#if new_apoint.beg > 0 && new_apoint.end > 0}
    <Selector
      id="room"
      label="Selecione a sala desejada:"
      values={rooms}
      bind:value={new_apoint.room}
    />
  {/if}
  <br />
  <TextBox class="mt-2" type="date" label="Data:" id="date" value={parseDate(new_apoint.date)} />
</div>
<div class="my-5 grid grid-cols-2" style="position:relative; left:60%; width:40%">
  <Button text="Enviar pedido de novo processo" class="mt-10 " on:click={addAppointment} />
</div>
