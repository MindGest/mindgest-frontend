<script>
  import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import Selector from "./Selector.svelte";
    import TextDisplay from "./TextDisplay.svelte";
    import Title from "./Title.svelte";

    let _class;
    export {_class as class}
    export let title;

    export let values;
    export let chosen;
    
    let selected = ""

    function add() {
        if (selected != "") {
            chosen.push(selected)
            selected = ""
            chosen = chosen
        }
    }

    function remove(point) {
        chosen = chosen.filter(x => x != point)
    }

    function options(chosen, values) {
        let options = []

        let picked = []
        chosen.forEach(value => {
            picked.push(value)
        });

        values.forEach(value => {
            if (!picked.includes(value)) {
                options.push(value)
            }
        });

        return options;
    }


</script>

<Title text={title}/>
<div class="flex flex-line">
    <Selector class="my-2 w-2/3" values={options(chosen, values)} bind:value={selected} placeholder="Escolha uma opção"/>
    <Button class="m-auto w-10 h-10" text="+" on:click={() => add()}/>
</div>

{#each chosen as point}
    <div class="flex flex-line">
        <TextDisplay class="my-2 w-2/3 {_class}" value="{point}"/>
        <Button class="m-auto w-10 h-10" text="-" on:click={() => remove(point)}/>
    </div>
{/each}