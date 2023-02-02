<!-- 
  Frontend: João Pinto
  Integração: Miguel
  Testing: Miguel
 -->
 <script>
    import TableMenu from '$lib/menus/TableMenu.svelte';
    import { onMount } from 'svelte';
    import * as api from '$lib/utils/api';
  
    let selected = '';
    let data = null;
  
    onMount(async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const speciality = urlParams.get("speciality")
      if (speciality != null) {
        selected = speciality;
      }
      
      let response = await api.get("process/list")
      if (response.ok) {
        let responseData = (await response.json())["data"];
        console.log(responseData)
        
        let records = []

        responseData.forEach(process => {

          let therapists = [process.mainTherapist.name]
          process.collaborators.therapists.forEach(therapist => {therapists.push(therapist.name)})
          
          let interns = []
          process.collaborators.interns.forEach(intern => {interns.push(intern.name)})

          let patients = []
          process.patients.forEach(patient => {patients.push(patient.name)})

          let careTakers = []
          process.careTakers.forEach(careTaker => {careTakers.push(careTaker.name)})
          records.push({
            "id": process.processId,
            "utentes": patients,
            "careTakers": careTakers,
            "therapists": therapists,
            "interns": interns,
            "active": process.active,
            "speciality": process.speciality,
            "refCode": process.ref,
            "remarks": process.remarks,

          })
        });
        data = records

      } else {
        alert("Erro ao obter processos")
      }
    });
  </script>
  
  {#if data != null}
    <TableMenu
      {data}
      id="id"
      add={true}
      search={["id", "utentes", "therapists", "interns", "active", "speciality", "refCode", "remarks", "careTakers"]}
      select="speciality"
      {selected}
      check="active"
    />
  {/if}
  
