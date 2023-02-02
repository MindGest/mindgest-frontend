<script>
    import TextDisplay from "./TextDisplay.svelte";
    export let data;
    export let placeholder;
    export let func;
    let _class;
    export {_class as class}
</script>

{#if data.length == 0}
    <h1 class="text-gray-500 italic font-semibold text-center mb-12">{placeholder}</h1>
{:else}
    {#each data as point}
        <TextDisplay class="my-2 {_class}" value="{func(point)}"/>
    {/each}
{/if}