<script>
  import Card from '$lib/components/Card.svelte';
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';

  let consultas = [];

  onMount(async () => {
    api.check("accountant")
    const response = await api.get('appointment/listLastTerminated', {});
    if (response.ok) {
      let json = await response.json();

      let jsonInfo = json['data'];

      let infoHelper = [];
      for (var i = 0; i < jsonInfo.length; i++) {
        let patients = jsonInfo[i]['patients'];
        let name = '';

        for (var j = 0; j < patients.length; j++) {
          name += patients[j]['name'];
        }

        let end = jsonInfo[i]['appointmentEndTime'];
        let date = new Date(end);
        let hour = date.getUTCHours();
        let minute = date.getUTCMinutes().toString().padStart(2, '0');
        let formated = `${hour}h${minute}`;

        infoHelper.push({ name: name, end: formated });
      }
      consultas = infoHelper;
      return;
    }
    status = response.status;
  });
</script>

{#if consultas != []}
  <div class="grid justify-items-center m-10">
    <h1 class="text-4xl font-bold m-10">Últimas Consultas Terminadas</h1>
    {#each consultas as consulta}
      <Card title={consulta.name} text="Terminada às {consulta.end}" />
    {/each}
  </div>
{/if}
