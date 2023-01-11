<script>
    import Button from '$lib/components/Button.svelte';
    import Checkbox from '$lib/components/Checkbox.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import Table from '$lib/components/MTable.svelte';

    let detailed = false;

    function toggle() {
        detailed = !detailed;
    }

    function detail(event) {
        console.log(event.detail.myData["Código da Consulta"]);
        toggle();
    }

    //FIXME: Integrar com Backend
    let info = [
        {
            'Utente': 'Helena Ferreira',
            'Responsável(eis)': 'Susana Duarte',
            'Código da Consulta': 'z',
            'Dia da Consulta': '15 de Outubro de 2022'
        },
        {
            'Utente': 'Helena Ferreira',
            'Responsável(eis)': 'Susana Duarte',
            'Código da Consulta': 'b',
            'Dia da Consulta': '15 de Outubro de 2022'
        },
        {
            'Utente': 'Helena Ferreira',
            'Responsável(eis)': 'Susana Duarte',
            'Código da Consulta': 'c',
            'Dia da Consulta': '15 de Outubro de 2022'
        },
        {
            'Utente': 'Helena Ferreira',
            'Responsável(eis)': 'Susana Duarte',
            'Código da Consulta': 'd',
            'Dia da Consulta': '15 de Outubro de 2022'
        }
    ];
	//FIXME: Integrar com Backend
	let infoUtente = {
		fatura: 1095040021,
		name: "Helena Ferreira",
		nif: 123456789,
		sns: 987654321,
		morada: "Rua xpto",
		email: "__helena__@dei.uc.pt",
		responsavel: "Helena Duarte",
		estado: "Concluída",
		data: "15 de Outubro de 2022",
		custo: 30
	}
</script>

{#if detailed}
	<h1 class="text-4xl font-bold mx-40 my-10">Detalhes da Consulta</h1>
	<div class="mx-40 my-10">
		<div class="my-5">
			<bold class="font-bold">Nome do(a) Utente:</bold> {infoUtente.name}
		</div> 
		<div class="my-5">
			<bold class="font-bold">NIF:</bold> {infoUtente.nif}
		</div>
		<div class="my-5">
			<bold class="font-bold">Número Sistema Saúde:</bold> {infoUtente.sns}
		</div>
		<div class="my-5">
			<bold class="font-bold">Morada Fiscal:</bold> {infoUtente.morada}
		</div>
		<div class="my-5">
			<bold class="font-bold">E-mail:</bold> {infoUtente.email}
		</div>
		<div class="my-5">
			<bold class="font-bold">Responsável:</bold> {infoUtente.responsavel}
		</div>
		<div class="my-5">
			<bold class="font-bold">Estado da Consulta:</bold> {infoUtente.estado}
		</div>
		<div class="my-5">
			<bold class="font-bold">Data da Consulta:</bold> {infoUtente.data}
		</div>
		<div class="my-16 font-bold text-red-500">Valor Total: {infoUtente.custo}</div>
	</div>
		
    <div class="mx-40 w-1/6">
        <Button on:click={toggle}>Voltar</Button>
    </div>
{:else}
    <div class="mx-20 my-10">
        <SearchBar hint="Pesquisa" />
        <div>
            <Checkbox label="Por pagar" checked={true} />
            <Checkbox label="Pago" checked={true} />
        </div>
    </div>
    <div class="grid justify-items-center m-10">
        <div class="w-2/3">
            <Table data={info} on:info={detail} />
        </div>
    </div>
{/if}
