<script>

    import Button from '$lib/components/Button.svelte';

    let data = {
        terp: "João Pedro",
        proc: "EspA2022-2023",
        esp: "Especialidade A",
        col:[],
        ut: "Manuel Pedro",
        status: "Ativo",
        fin: false
    }

    function getCol(){

        if (data.col.length === 0){
            return "Não há colaboradores associados a este processo";
        }

        let out = "";

        data.col.forEach(element => {
            out += element.name + "\n";
        });

        return out;

    }

    function seePay(){
        if (data.fin === false) return "Pagamentos em Atraso";
        else return "Pagamentos em dia";
    }

    function gotoNotes(){
        /* ir para o ecrã com as notas do processo */
    }

    function gotoApp(){
        /* ir para o ecrã com as consultas do processo */
    }

    function gotoPay(){
        /* ir para o ecrã com os pagamentos do processo */
    }

    function edit(){
        /* ir para o ecrã para editar o processo */
    }

    function back(){
        /* ir para o menu de pesquisa */
    }


</script>

<wrapper class="flex flex-col" style="margin: 100px; float:left; width:40%; position:relative; top:10%">
    <p><b>Terapeuta Responsável: </b>{data.terp}</p>
    <p><b>Processo: </b>{data.proc}</p>
    <p><b>Especialidade: </b>{data.esp}</p>
    <p><b>Colaboradores: </b>{getCol()}</p>
    <p><b>Utente: </b>{data.ut}</p>
    <p><b>Estado: </b>{data.status}</p>
    <p><b>Situação Financeira: </b>{seePay()}</p>
</wrapper>

<wrapper class="flex flex-col" style="float:right; width:20%; position:relative; top:20%; bottom:10%; right:10%">
    <Button on:click={gotoNotes}>Ver Notas</Button>
    <br>
    <Button on:click={gotoApp}>Ver Consultas</Button>
    <br>
    <Button on:click={gotoPay}>Ver Pagamentos</Button>
    <br>
    {#if data.fin === false}
        <Button on:click={gotoPay}>Verificação de pagamentos em atraso</Button>
    {/if}
</wrapper>

<div style="margin: 100px; float:left; width:40%; position:relative; top:10%">
    <Button on:click={edit}>Editar Processo</Button>
    <br>
    <Button on:click={back}>Voltar ao Menu de Pesquisa</Button>
</div>