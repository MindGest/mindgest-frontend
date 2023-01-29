<script>
    import { goto } from '$app/navigation';
    import Button from '$lib/components/Button.svelte';

    let data = {
        terp: "João Pedro",
        proc: "123",
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
        goto("/user/therapist/records/" + data.proc + "/notes" )
    }

    function gotoApp(){
        /* ir para o ecrã com as consultas do processo */
    }

    function gotoPay(){
        /* ir para o ecrã com os pagamentos do processo */
    }

    function edit(){
        goto("/user/therapist/records/" + data.proc + "/edit" )
    }

    function back(){
        goto("/user/therapist/records")
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
    <Button class="my-5" text="Ver Notas" on:click={gotoNotes}/>
    <Button class="my-5" text="Ver Consultas" on:click={gotoApp}/>
    <Button class="my-5" text="Ver Pagamentos" on:click={gotoPay}/>
</wrapper>

<div style="margin: 100px; float:left; width:40%; position:relative; top:10%">
    <Button text="Editar Processo" on:click={edit}/>
    <Button text="Voltar ao Menu de Pesquisa" on:click={back}/>
</div>

<div style="margin: 100px; float:left; width:40%; position:relative; top:10%">
    <Button text="Editar Processo" on:click={edit}/>
    <br>
    <Button text="Voltar ao Menu de Pesquisa" on:click={back}/>
</div>