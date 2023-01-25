<script>
  import translate from '$lib/utils/translate';

  let class_;
  export { class_ as class };
  export let title;
  export let subtitle;
</script>

<div class={class_}>
  <button class={`border-2 border-slate-500 p-5 rounded-lg`} on:click>
    <div class="grid justify-items-start">
      <h1 class="font-bold">{translate(title)}</h1>
      <h1>{translate(subtitle)}</h1>
      <slot />
    </div>
  </button>
</div>
