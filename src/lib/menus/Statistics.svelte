<!--
    Frontend: Miguel
    Integração: Gabriel
    Testado: ??

    Aplicado em:
        - /user/admin/stats
        - /user/therapist/stats
        - /user/intern/stats

 -->

<script>
    import Button from "$lib/components/Button.svelte";
    import Selector from "$lib/components/Selector.svelte";
    import TextBox from "$lib/components/TextBox.svelte";
    import { onMount } from "svelte";
    import jsPDF from "jspdf";
    import autoTable  from "jspdf-autotable";
    import * as api from "$lib/utils/api";

    export let role;

    const INTERN = "intern"
    const ADMIN = "admin"
    const THERAPIST = "therapist"
    const NOFILTER = "Sem Filtro"
    
    let data = null;
  
    onMount(async () => {
        let responseSpecialities = await api.get("speciality/list");
        let responseRecords = await api.get("/process/get-processes");

        if (responseSpecialities.ok && responseRecords.ok) {
            let specialities = await responseSpecialities.json()["data"];
            let records = await responseRecords.json()["data"];

            let specialities_names = ["Sem filtro"]
            specialities.forEach(spec => {specialities_names.push(spec.speciality)});

            let records_names = ["Sem filtro"]
            let therapists_names = ["Sem filtro"]
            records.forEach(record => {
                records_names.push(formatRecord(record));
                record.therapists.forEach(therapist => {
                    therapists_names.push(formatTherapist(therapist))
                })
            });


            data = {
                "role": role,
                
                "start": "",
                "end": "",
                "record": NOFILTER,
                "speciality": NOFILTER,
                "therapist": NOFILTER,
                
                "records": records_names,
                "specialities": specialities_names,
                "therapists": therapists_names
            }
        }
    });
  
    async function generate() {
        if (data.start == "" || data.end == "") {
            alert("Tem de escolher datas de início e fim")
            return
        }

        if (new Date(data.end) <= new Date(data.start)) {
            alert("A data de início tem de vir antes da data de fim")
            return
        }

        let body = {
            "startDate": new Date(data.start).toISOString(),
            "endDate": new Date(data.end).toISOString(),
            "speciality": data.speciality != NOFILTER ? data.speciality : null,
            "processId": data.record != NOFILTER ? parseInt(data.record.split("]")[0].slice(1)) : null,
            "therapistId": data.therapist != NOFILTER ? parseInt(data.therapist.split("]")[0].slice(1)) : null 
        };

        let response = await api.post("/statistics/", body);

        if (!response.ok) {
            alert ("Erro ao gerar estatísticas")
            return
        }

        const pdf = new jsPDF('p','px', 'a4');
        let y = 20;
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold')
        pdf.text("Estatísticas", 40, y); y = incrementY(pdf, y, 30);
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(12);
        pdf.text("Data Inicial: " + start, 40, y); y = incrementY(pdf, y, 30);
        pdf.text("Data Fim: " + end, 40, y); y = incrementY(pdf, y, 30);
        processes.forEach( proc => {
            pdf.setFontSize(16);
            pdf.text("Processo: " + proc.id, 40, y); y = incrementY(pdf, y, 25);
            pdf.setFontSize(12);
            pdf.text("Especialidade: " + proc.speciality, 40, y); y = incrementY(pdf, y, 25);
            pdf.text("Terapeuta Responsável: " + proc.name, 40, y); y = incrementY(pdf, y, 25);
            pdf.text("Utente: " + proc.patientName, 40, y); y = incrementY(pdf, y, 25);
            pdf.text("Total: " + proc.total + " €", 40, y); y = incrementY(pdf, y, 25);
            pdf.autoTable({
                startY: y,
                headStyles :{fillColor : [251, 146, 60]},
                body: proc.appointments,
                columns: [
                        {header: "#", dataKey: "n"},
                        {header: "Data", dataKey: "date"},
                        {header: "Custo", dataKey: "cost"},
                    ],
            })
            y = incrementY(pdf, y, pdf.autoTable.previous.finalY + 40 - y);
        });
        pdf.save("estatísticas.pdf")
    }
  
    function incrementY(doc, y, inc) {
        if (y + inc > 550) {
            doc.addPage()
            return 20;
        }
        return y + inc;
    }

    function formatRecord(record) {
        return "[" + record.id + "] " + record.name;
    }

    function formatTherapist(therapist) {
        return "[" + therapist.id + "] " + therapist.name;
    }
</script>
  
{#if data != null}
    <h1 class="text-4xl text-center mt-5 mb-10">Gerar estatísticas</h1>

    <form on:submit|preventDefault={async () => { await generate() }}>
        <TextBox class="my-5 w-1/2 m-auto bg-ora" label="Data de Início" type="date" bind:value={data.start}/>
        <TextBox class="my-5 w-1/2 m-auto" label="Data de Fim" type="date" bind:value={data.end}/>
        
        <Selector class="my-5 w-1/2 m-auto" label="Processo" values={data.records} bind:value={data.record}/>
        <Selector class="my-5 w-1/2 m-auto" label="Especialidade" values={data.specialities} bind:value={data.speciality}/>
        {#if data.role != THERAPIST}
            <Selector class="my-5 w-1/2 m-auto" label="Terapeuta" values={data.therapists} bind:value={data.therapist}/>
        {/if}
        
        <Button class="my-5 w-1/2 m-auto" type="submit" text="Gerar"/>
    </form>  
{/if}