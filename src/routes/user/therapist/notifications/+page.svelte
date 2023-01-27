<script>
    import Button from '$lib/components/Button.svelte';
    import { onMount } from 'svelte';
    import { loop_guard } from 'svelte/internal';

    /* PARA DEBUG */
    let notif = [
        {titulo: "pedido de consulta FALSE", lido: false},
        {titulo: "pedido de registo TRUE", lido: true},
        {titulo: "pedido de consulta TRUE", lido: true},
        {titulo: "migração processo FALSE", lido: false}
    ]

    onMount(async () => {
        /* help */
    });

    async function back() {
        alert("pressed")
    }

    async function changeReadability(n){
        //if (n.lido === false) n.lido = true;
        //else if (n.lido === true) n.lido = false;
    }

</script>

<div class="flex flex-col justify-center h-auto w-5/6 m-10 p-5 width = 20%">
    
    <p class="font-normal text-xl">Notificações Pendentes</p>
    {#each notif as n}
        {#if n.lido === false}
            <wrapper class="flex flex-col" style="margin: 20px; float:left; width:30%; position:relative; top:10%">
                <p>{n.titulo}</p> 
            </wrapper>
            <wrapper class="flex flex-col" style="float:right; width:20%; position:relative; left:30%">
                <Button on:click={changeReadability(n)} style="position:relative; left:60%; width:10%">Marcar como lido</Button>
            </wrapper>
        {/if}
    {/each}
    <br>
    <p class="font-normal text-xl">Notificações Antigas</p>
    {#each notif as n}
        {#if n.lido === true}
            <wrapper class="flex flex-col" style="margin: 10px; float:left; width:30%; position:relative; top:10%">
                <p>{n.titulo}</p>
                <Button on:click={changeReadability(n)} style="position:relative; left:60%; width:10%">Marcar como não lido</Button>
            </wrapper>  
        {/if}
    {/each}

</div>

<div class="my-5 grid grid-cols-2" style="margin=50px; position:relative; left:60%; width:50%">
    <Button class="mt-10" on:click={back}>Voltar ao Ecrã Inicial</Button>
</div>