<script>
    import TextBox from '$lib/components/TextBox.svelte';
    import Button from '$lib/components/Button.svelte';
    import Selector from '$lib/components/Selector.svelte';
  
    let records=[]
    let rooms=[]
    let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    let data = {
      record: '',
      room: '',
      start: 0,
      end: 0,
      date: ''
    };
  
    function addAppointment(){};
  
  </script>
  
  <div class="flex flex-col justify-center h-auto w-5/6 m-10 p-5 items-stretch">
    <p class="font-normal text-xl">Nova Consulta</p>
    <Selector id="proc" label="Selecione um Processo:" values={records} bind:value={data.proc} />
    <Selector id="beg" label="Selecione a hora de início:" values={hours} bind:value={data.start} />
    <Selector id="end" label="Selecione a hora de fim:" values={hours} bind:value={data.end} />
    <Selector id="room" label="Selecione a sala desejada:" values={rooms} bind:value={data.room} />
    <TextBox class="mt-2" type="date" label="Data:" id="date" value={data.date}/>
  </div>
  <div class="my-5 grid grid-cols-2" style="position:relative; left:60%; width:40%">
    <Button text="Enviar pedido de novo processo" class="mt-10 " on:click={addAppointment}/>
  </div>
  