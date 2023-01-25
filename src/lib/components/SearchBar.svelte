<script>
  import translate from '$lib/utils/translate';

  export let placeholder = '';
  export let value = '';
</script>

<div class="border border-zinc-400 bg-zinc-50 rounded-md focus:outline-orange-200 focus:outline-offset-1 flex p-2">
  <img class="w-4" src="/img/search.svg" alt=""/>
  <input class="bg-transparent outline-none ml-2 w-full" placeholder={translate(placeholder)} bind:value/>
</div>