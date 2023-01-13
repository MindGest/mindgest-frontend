<!--
TODO
    - better styling (align sutff)
    - fix navbar bug (quando se faz scroll para cima o conteúdo fica em cima da navbar)
    - alterar tabela para que cada linha seja um botão
-->

<script>
    import TextArea from '$lib/components/TextArea.svelte';
    import TextBox from '$lib/components/TextBox.svelte';
    import Button from '$lib/components/Button.svelte';
    import Table from '$lib/components/Table.svelte';

    /******************
     *                *
     * *FOR DEBUGGING *
     *                *
     *****************/
    class person {
        constructor(name, role, proc) {
            this.name = name;
            this.role = role;
            this.proc = proc;
        }
    }
    class process{
        constructor(patient, code, esp){
            this.patient = patient;
            this.code = code;
            this.esp = esp
        }
    }
    let pat1 = new person('Ana A', 'pat', null);
    let pat2 = new person('Bruno', 'pat', null);
    let pat3 = new person('André', 'pat', null);
    let pat4 = new person('Diana', 'pat', null);
    let pat5 = new person('Ana B', 'pat', null);
    let terp = new person('Maria', 'terp', [
        new process(pat1, 1234, "espA"), 
        new process(pat2, 5678, "espB"), 
        new process(pat3, 9012, "espC"),
        new process(pat4, 3456, "espA"),
        new process(pat5, 3456, "espB")]);
    let esps = ["espA", "espB", "espC"]
    /******************
     *                *
     *FINISH DEBUGGING*
    *                *
    *****************/

    let list_esp = esps;
    let selectedEsp;
    let text = '';
    let table;
    const newProc = () => alert("Novo Processo")

    $: if (selectedEsp) getTableData(selectedEsp);
    $: if (!selectedEsp) getTableData("all");
    const getTableData = (esp) => {
        text = null;
        let out = [];
        for (let i = 0; terp.proc.length > i; i++){
            if (!esp || esp === "all" || esp === terp.proc[i].esp){
                let p = terp.proc[i]
                out.push({
                    Utente: p.patient.name,
                    Codigo: p.code,
                    Especialidade: p.esp
                })
            }
        }
        table = out;
    }

    $: if (text) getNameFilter(text);
    const getNameFilter = (text) => {
        selectedEsp == "all"
        let aux = terp.proc.filter(proc => proc.patient.name.indexOf(text) !== -1);
        let out = [];
        
        for (let i = 0; aux.length > i; i++){
            let p = aux[i]
            out.push({
                Utente: p.patient.name,
                Codigo: p.code,
                Especialidade: p.esp
            })
        }
        
        table = out;

        if (table.length === 0) selectedEsp = "none"

    }

</script>


<wrapper class="flex flex-col"
  style="margin: 100px; float:left; width:30%; position:absolute; top:5%">
    <section class="filtro-esp">
        <select
        class="menu bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400"
        name="filtro-esp"
        id="filtro-esp"
        bind:value={selectedEsp}
        >
        <option disabled selected value="">Selecione uma Especialidade</option>
        <option value="all">Todas</option>
        {#each list_esp as e}
            <option value={e}>{e}</option>
        {/each}
        </select>
    </section>
</wrapper>

<wrapper class="flex flex-col"
  style="float:center; width:30%; position:relative; top:4%; left:400px">
    <TextArea label="Pesquisar Utente" bind:value={text}/>
</wrapper>

<wrapper class="flex flex-col"
  style="float:right; width:10%; position:relative; top:-2%; right:300px">
    <Button on:click={newProc}>Novo Processo</Button>
</wrapper>

<div style="margin:100px">
    
    <!-- title of the list -->
    {#if !selectedEsp || selectedEsp === "all"} <p class="font-normal text-2xl">Todos</p>
    {:else if table.length > 0} <p class="font-normal text-2xl">{selectedEsp}</p>
    {:else} <p class="font-normal text-2xl">Não foram encontrados nenhuns resultados</p>
    {/if}

    <!-- print the list -->
    {#if table.length > 0} <Table data={table}/>
    {/if}


</div>
    

