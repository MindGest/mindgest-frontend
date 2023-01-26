<script>
  import translate from '$lib/utils/translate';
  import { createEventDispatcher } from 'svelte';
  import Card from './Card.svelte';

  let class_ = '';
  export { class_ as class };
  export let placeholder = '';
  export let data = [];

  const dispatch = createEventDispatcher();
</script>

<div class={class_}>
  <div class="space-y-5">
    {#if data.length === 0}
      <p class="text-gray-500 italic font-semibold">{translate(placeholder)}</p>
    {:else}
      {#each data as { title, text }, index}
        <Card {title} {text} on:click={() => dispatch('click', index)} />
      {/each}
    {/if}
  </div>
</div>
