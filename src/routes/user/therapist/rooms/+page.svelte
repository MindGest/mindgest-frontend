<script type="text/javascript">
  import { onMount } from "svelte";
  import * as api from '$lib/utils/api';
  import DatePicker from '$lib/components/DatePicker.svelte';
  import { uploadProfilePicture, parseDate, reverseParseDate } from "$lib/utils/util";


  class person {
    constructor(name, role) {
      this.name = name;
      this.role = role;
    }
  }
  class appointment {
    constructor(room, title, roomId, terp, hour_beg, dur, patient, date) {
      this.room = room;
      this.terp = terp;
      this.hour_beg = hour_beg;
      this.dur = dur;
      this.patient = patient;
      this.roomId = roomId;
      this.title = title;
      this.date = date;
    }
  }
  class room{
    constructor(name, id){
      this.name = name;
      this.id = id;
    }
  }

  var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  var list_apoint = [];
  var list_rooms = [];
  let selectedRoom;
  let selectedDate;

  onMount(async () => {
		const response = await api.get('rooms/list', {}, );
    if (response.ok) {
        let json = await response.json();
        let jsonInfo = json["message"];
        let infoHelper = [];

        for (var i = 0; i < jsonInfo.length; i++) { 
            let name = jsonInfo[i]["name"];
            let id = jsonInfo[i]["id"];
            infoHelper.push({'name': name, 'id':id});
        }
        list_rooms = infoHelper;
    }
    status = response.status;
    
    const response2 = await api.get('rooms/listAppointmentsRoom', {}, );
    if (response.ok) {
        let json = await response2.json();
        let jsonInfo = json["message"];
        let infoHelper = [];
        let therapistHelper = [];
        for (var i = 0; i < jsonInfo.length; i++) { 
            let appointments = jsonInfo[i]["appointmentsRoom"]
            for(var k = 0; k<appointments.length; k++){
              let startDate = new Date(appointments[k]['startDate']);
              let endDate = new Date(appointments[k]['endDate']);
              let durationInMs = endDate.getTime() - startDate.getTime();
              let durationInHours = durationInMs / 3600000;

              let initHour = startDate.getHours();
              
              //ISTO TA SO PARA DEBUG
              let personH = new person(appointments[k]['userName'], 'patient');
              infoHelper.push(new appointment(jsonInfo[i]['room'], appointments[k]['title'],jsonInfo[i]['roomId'], appointments[k]['therapists'], initHour, durationInHours, personH));
              //infoHelper.push(new appointment(jsonInfo[i]['room'], appointments[k]['title'],jsonInfo[i]['roomId'], new person("TESTE", "terp"), initHour, durationInHours, personH));

              for(var j=0; j < appointments[k]['therapists'].length; j++){
                therapistHelper.push(new person(appointments[k]['therapists'][j]['name'], 'terp'))
              }
            }
        }
        list_apoint = infoHelper;
        list_terps = therapistHelper;
    }
    resetFilter();
    status = response.status;
	});

  /*
        If the user is a guard than the button value is null
        Else it should redirect to either the appointment page
            or the new appointment page
    */
  function isGuard() {
    console.log(list_apoint);
    // COLOCAR AQUI UMA ROUTE
    if ((seguranca.role = 'guard'))
      alert('This user is a guard so there is no action here'); //elem.value = null;
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

  function getTherapist(ap, d){

    let out = ""
    
    for (let i = 0; ap.terp.length > i; i++){
      
      if (i === 0) out += ap.terp[i].name;
      else out += ", " + ap.terp[i].name;

    }

    return out;

  }


  // get today's date
  function week_func(){

    let out = [];
    let i = 0;
    let date = new Date();

    while (i < 8){

      if (i === 0) date.getDate();
      else date.setDate(date.getDate() + 1);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      out.push([new Date(year, month-1, day), day + "/" + month + "/" + year]);
      i = i + 1;

    }

    return out;

  }

  let week = week_func()

  /*
        For the dropdown filters
    */
  let filterRoom = [];
  let filterDate = [];
  $: if (selectedRoom) getFilterRooms();
  const getFilterRooms = () => {
    if (selectedRoom === 'all') return (filterRoom = list_rooms);
    return (filterRoom = list_rooms.filter(room => room['name'] === selectedRoom));
  };
  $: if (selectedDate) getFilterDates();
  const getFilterDates = () => {
    console.log("detetou nova data " + selectedDate);
    week = [selectedDate, selectedDate.getDate() + "/" + selectedDate.getMonth()+1 + "/" + selectedDate.getFullYear()];
  };
  $: if (!selectedRoom) filterRoom = list_rooms;
  $: if (!selectedDate) week = week_func();


</script>

<!-- dropdown buttons -->
<wrapper
  class="flex flex-col"
  style="margin: 100px; float:left; width:30%; position:relative; top:10%"
>
  <section class="menu-cont">
    <select
      class="menu bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400"
      name="filtro_room"
      id="filtro_room"
      bind:value={selectedRoom}
    >
      <option disabled selected value="">Selecione uma Sala</option>
      <option value="all">Todas</option>
      {#each list_rooms as r}
        <option value={r['name']}>{r['name']}</option>
      {/each}
    </select>
  </section>

  <section class="menu-cont">
    <DatePicker id="filtro_date" label="Escolha uma Data:" value="{parseDate(selectedDate)}" class="grid grid-cols-3 items-center font-bold"/>
  </section>
</wrapper>

<!-- rooms list -->
<wrapper
  class="flex flex-col"
  style="float:right; width:30%; position:relative; top:20%; bottom:10%; right:10%"
>

  {#each week as d}
    <p class="font-normal text-2xl">{d[1]}</p>

    {#each filterRoom as r}
      <p class="font-normal text-xl">{r['name']}</p>

      {#each hours as h}
        {#each list_apoint.sort(sortRooms('hour_beg')) as ap}

          {#if r['name'] === ap.room && h >= ap.hour_beg && ap.hour_beg + ap.dur > h && (ap.date.getFullYear() === d[0].getFullYear() && ap.date.getMonth() === d[0].getMonth() && ap.date.getDate() === d[0].getDate())}
            <button
              class="bg-orange-300 hover:bg-orange-100 text-gray-800 font-semibold py-2 px-3"
              on:click={isGuard}>
              {getTherapist(ap, d)}; {h}h
            </button>
          {:else}
            <button
              class="bg-green-300 hover:bg-green-100 text-gray-800 font-semibold py-2 px-3"
              on:click={isGuard}
              id="">{h}h</button
            >
          {/if}

        {/each}
      {/each}
    {/each}
  {/each}

</wrapper>