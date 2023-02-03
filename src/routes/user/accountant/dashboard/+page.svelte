<script>
  import { onMount } from 'svelte';
  import * as api from '$lib/utils/api';
  import List from '$lib/components/List.svelte';
  import Title from '$lib/components/Title.svelte';
  import formatDate from '$lib/utils/formatDate';
  import translate from '$lib/utils/translate';

  let appointments = [];
  let placeholder = 'A carregar';

  onMount(async () => {
    const response = await api.get('appointment/last-terminated');
    if (response.ok) {
      ({ data: appointments } = await response.json());
      placeholder = 'Sem consultas';
      return;
    }
    placeholder = 'Erro';
  });
</script>

<Title text="Últimas consultas" />
<List
  class="mt-5"
  {placeholder}
  data={appointments.map(({ patients, appointmentEndTime }) => ({
    title: patients.map(({ name }) => name).join(', '),
    text: `${translate('finished at')} ${formatDate(appointmentEndTime)}`
  }))}
/>
