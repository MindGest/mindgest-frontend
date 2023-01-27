<script>
  import TextBox from '$lib/components/TextBox.svelte';
  import Button from '$lib/components/Button.svelte';
  //import DatePicker from '$lib/components/DatePicker.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import { parseDate } from '$lib/utils/util';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  /* PARA DEBUGGG*/
  // let proc = [{ text: 'Proc1' }, { text: 'Proc2' }, { text: 'Proc3' }];
  let proc = [];
  let rooms = [{ text: 's1' }, { text: 's2' }, { text: 's3' }];

  let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  let new_apoint = {
    proc: '',
    room: '',
    h: '',
    dur: '',
    date: ''
  };

  onMount(async () => {
    /* help */

    // obter os processos do terapeuta
    const responseProcesses = api.get("/process/listTherapist", {});
    if (responseProcesses.ok){
      let json = await responseProcesses.json();
      var list = json['list'];
      for (let i = 0; i < list.length; i++){
        proc.push({text: list[i]['refCode']});
      }
    }

    // obter as salas

  });

  async function addAppointment() {
    /* help */
  }
</script>

<div class="flex flex-col justify-center h-auto w-5/6 m-10 p-5 items-stretch">
  <p class="font-normal text-xl">Nova Consulta</p>
  <Selector
    id="proc"
    label="Selecione um Processo:"
    options={proc}
    display_func={o => o.text}
    bind:value={new_apoint.proc}
    class="grid grid-cols-4 items-center font-bold"
  />
  <Selector
    id="proc"
    label="Selecione a hora de início:"
    options={hours}
    display_func={o => o}
    bind:value={new_apoint.h}
    class="grid grid-cols-4 items-center font-bold"
  />
  <Selector
    id="proc"
    label="Selecione a sala desejada:"
    options={rooms}
    display_func={o => o.text}
    bind:value={new_apoint.room}
    class="grid grid-cols-4 items-center font-bold"
  />
  <TextBox
    id="dur"
    label="Duração prevista:"
    bind:value={new_apoint.dur}
    class="grid grid-cols-4 items-center font-bold"
  />
  <!-- <DatePicker
    id="date"
    label="Data:"
    value={parseDate(new_apoint.date)}
    class="grid grid-cols-4 items-center font-bold"
  /> -->
</div>
<div class="my-5 grid grid-cols-2" style="position:relative; left:60%; width:40%">
  <Button text="Criar Consulta" class="mt-10 " on:click={addAppointment}/>
</div>
