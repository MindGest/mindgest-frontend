<script>
  import { createEventDispatcher } from 'svelte';
  import translate from '$lib/utils/translate';
  import preventDoubleClickSelect from '$lib/utils/preventDoubleClickSelect';

  let class_ = '';
  export { class_ as class };
  export let placeholder = '';
  export let data = [];

  let key_ = '';
  let descending = true;
  const sort = key => {
    descending = key === key_ ? !descending : true;
    key_ = key;
    data = data.sort((a, b) => (descending ? 1 : -1) * (a[key] > b[key]) - (b[key] > a[key]));
  };

  const dispatch = createEventDispatcher();
</script>

<div class={class_}>
  <table class="w-full rounded-md border-separate border-spacing-0">
    <thead>
      <tr>
        {#if data.length === 0}
          <th class="text-gray-500 italic font-semibold">{translate(placeholder)}</th>
        {:else}
          {#each Object.keys(data[0]) as key}
            <th
              class="border-zinc-400 border-r first:border-l border-y first:rounded-tl-md last:rounded-tr-md cursor-pointer p-2 font-normal bg-zinc-100"
              on:mousedown={preventDoubleClickSelect}
              on:click={() => sort(key)}
            >
              {translate(key)}
              {#if key === key_}
                <span>{descending ? '↓' : '↑'}</span>
              {/if}
            </th>
          {/each}
        {/if}
      </tr>
    </thead>
    {#if data.length > 0}
      <tbody class="text-center">
        {#each data as row}
          <tr
            class="cursor-pointer hover:bg-orange-200 group"
            on:click={() => dispatch('click', row)}
          >
            {#each Object.values(row) as value}
              <td
                class="first:border-l border-r border-b border-zinc-400 group-last:first:rounded-bl-md group-last:last:rounded-br-md p-2"
              >
                {value}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {/if}
  </table>
</div>
