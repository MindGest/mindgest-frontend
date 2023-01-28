<script type="text/javascript">
  //import { onMount } from 'svelte';
  //import * as api from '$lib/utils/api';
  import TextBox from '$lib/components/TextBox.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import Button from '$lib/components/Button.svelte';


  let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let list_apoint = [
    {hour_beg: 12, hour_end: 13, room:"r1", terp:["Maria"]}, 
    {hour_beg:9, hour_end:11, room:"r2", terp:["Ana"]}, 
    {hour_beg:16, hour_end:17, room:"r1", terp:["Maria", "Ana"]}];
  let list_rooms = ['r1', 'r2', 'r3'];
  let selected='';

  let filteredSearch = {
    room:'',
    date: ''
  };

  let room_aux = '';

  /*onMount(async () => {
    const response = await api.get('rooms/list', {});
    if (response.ok) {
      let json = await response.json();
      let jsonInfo = json['message'];
      let infoHelper = [];

      for (var i = 0; i < jsonInfo.length; i++) {
        let name = jsonInfo[i]['name'];
        let id = jsonInfo[i]['id'];
        infoHelper.push({ name: name, id: id });
      }
      list_rooms = infoHelper;
    }
    status = response.status;

    const response2 = await api.get('rooms/listAppointmentsRoom', {});
    if (response.ok) {
      let json = await response2.json();
      let jsonInfo = json['message'];
      let infoHelper = [];
      let therapistHelper = [];
      for (var i = 0; i < jsonInfo.length; i++) {
        let appointments = jsonInfo[i]['appointmentsRoom'];
        for (var k = 0; k < appointments.length; k++) {
          let startDate = new Date(appointments[k]['startDate']);
          let endDate = new Date(appointments[k]['endDate']);
          let durationInMs = endDate.getTime() - startDate.getTime();
          let durationInHours = durationInMs / 3600000;

          let initHour = startDate.getHours();

          //ISTO TA SO PARA DEBUG
          let personH = new person(appointments[k]['userName'], 'patient');
          infoHelper.push(
            new appointment(
              jsonInfo[i]['room'],
              appointments[k]['title'],
              jsonInfo[i]['roomId'],
              appointments[k]['therapists'],
              initHour,
              durationInHours,
              personH
            )
          );
          //infoHelper.push(new appointment(jsonInfo[i]['room'], appointments[k]['title'],jsonInfo[i]['roomId'], new person("TESTE", "terp"), initHour, durationInHours, personH));

          for (var j = 0; j < appointments[k]['therapists'].length; j++) {
            therapistHelper.push(new person(appointments[k]['therapists'][j]['name'], 'terp'));
          }
        }
      }
      list_apoint = infoHelper;
      list_terps = therapistHelper;
    }
    resetFilter();
    status = response.status;
  });*/

  /*
    If the user is a guard than the button value is null
    Else it should redirect to either the appointment page
        or the new appointment page
  */
  function isGuard() {

    // COLOCAR AQUI UMA ROUTE
    if ((seguranca.role = 'guard')) alert('This user is a guard so there is no action here'); //elem.value = null;
    else alert('This user is NOT a guard so should be redirected'); //elem.value = "...redirecting for the right page";
  }

  /*
    Sort the appointments according to the chosen property
  */
  function sortRooms(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  function getTherapist(ap) {

    let out = '';

    for (let i = 0; ap.terp.length > i; i++) {
      if (i === 0) out += ap.terp[i];
      else out += ', ' + ap.terp[i];
    }

    return out;
  }

  // get today's date
  function week_func() {
    let out = [];
    let i = 0;
    let date = new Date();

    while (i < 1) {
      if (i === 0) date.getDate();
      else date.setDate(date.getDate() + 1);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      out.push([new Date(year, month - 1, day), day + '/' + month + '/' + year]);
      i = i + 1;
    }

    return out;
  }
  let week = week_func();

  $:if(filteredSearch.room.length > 0) console.log(filteredSearch.room);

</script>


<wrapper class="flex flex-col" style="margin:50px; float:left; width:30%; position:relative; top:10%">
  <Selector label="Salas:" values={list_rooms} bind:value={filteredSearch.room} />
  <TextBox bind:value={filteredSearch.date} id="date" class="mt-2" type="date" label="Escolha uma Data:" />
</wrapper>


<wrapper class="flex flex-col" style="float:right; width:40%; position:relative; top:20%; bottom:10%; right:10%">
  
  {#each week as d}
    <p class="font-normal text-2xl">{d[1]}</p>

    {#each list_rooms as r}
      {#if filteredSearch.room.length === 0 || filteredSearch.room === r} 
        <p class="font-normal text-xl">{r}</p>

        {#each hours as h}
          {#each list_apoint.sort(sortRooms('hour_beg')) as ap}

            {#if r === ap.room && h >= ap.hour_beg && ap.hour_end > h} <!--&& ap.date.getFullYear() === d[0].getFullYear() && ap.date.getMonth() === d[0].getMonth() && ap.date.getDate() === d[0].getDate()-->
              <Button text="{getTherapist(ap)}; {h}h" on:click={isGuard()}/>
            {:else}
              <Button text="{h}h" on:click={isGuard()}/>
            {/if}

          {/each}
        {/each}
      {/if}
    {/each}
  {/each}
</wrapper>
