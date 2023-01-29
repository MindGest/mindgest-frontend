<script>
    import Button from "$lib/components/Button.svelte";
    import Selector from "$lib/components/Selector.svelte";
    import TextBox from "$lib/components/TextBox.svelte";
    import { onMount } from "svelte";
    import jsPDF from "jspdf";
    import autoTable  from "jspdf-autotable";
  
    let start = "";
    let end = "";
    let record = "";
    let speciality = "";
  
    let records = ["Proc1", "Proc2", "Proc3"]
    let specialities = ["EspA", "EspB", "EspC"];
  
        onMount(async () => {
            //TODO: getAvailableRecords(this.user) & getAvailableSpecialities(*all*);
        });
  
    function generate() {
        // let body = {
        //     "startDate": new Date(start).toISOString(),
        //     "endDate": new Date(end).toISOString(),
        //     "processId": record,
        //     "specialityId": speciality,
        //     // "therapistId": null
        // };
  
        let processes = [
            {
                "id": 1,
                "speciality": "specA",
                "name": "terapeuta1",
                "patientName": "utente1",
                "total": 69.6,
                "nAppointments": 3,
                "appointments": [
                    {"n": 1, "date": "31/01/2023", "cost": 23.2},
                    {"n": 2, "date": "22/01/2023", "cost": 23.2},
                    {"n": 3, "date": "30/01/2023", "cost": 23.2}
                ]
            },
            {
                "id": 2,
                "speciality": "specB",
                "name": "terapeuta2",
                "patientName": "utente2",
                "total": 99.0,
                "nAppointments": 3,
                "appointments": [
                    {"n": 4, "date": "31/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 5, "date": "22/01/2023", "cost": 33.0},
                    {"n": 6, "date": "30/01/2023", "cost": 33.0}
                ]
            },
            {
                "id": 3,
                "speciality": "specC",
                "name": "terapeuta3",
                "patientName": "utente3",
                "total": 66.0,
                "nAppointments": 3,
                "appointments": [
                    {"n": 6, "date": "31/01/2023", "cost": 33.0},
                    {"n": 7, "date": "22/01/2023", "cost": 33.0},
                ]
            },
            {
                "id": 4,
                "speciality": "specD",
                "name": "terapeuta4",
                "patientName": "utente4",
                "total": 132.0,
                "nAppointments": 3,
                "appointments": [
                    {"n": 8, "date": "31/01/2023", "cost": 33.0},
                    {"n": 9, "date": "22/01/2023", "cost": 33.0},
                    {"n": 10, "date": "22/01/2023", "cost": 33.0},
                    {"n": 11, "date": "22/01/2023", "cost": 33.0},
                ]
            },
        ];

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
                columns: [
                        {header: "#", dataKey: "n"},
                        {header: "Data", dataKey: "date"},
                        {header: "Custo", dataKey: "cost"},
                    ],
                body: proc.appointments,
                headStyles :{fillColor : [251, 146, 60]},
                y
            })
            y = incrementY(pdf, y, pdf.autoTable.previous.finalY + 40 - y);
        });
      pdf.save("statistics.pdf")
    }
  
    function incrementY(doc, y, inc) {
        if (y + inc > 550) {
            doc.addPage()
            return 20;
        }
        return y + inc;
    }
</script>
  
  <h1 class="text-4xl text-center mt-5 mb-10">Gerar estatísticas</h1>
  
  <form on:submit|preventDefault={() => { generate() }}>
      <TextBox class="my-5 w-1/2 m-auto bg-ora" label="Data de Início" type="date" bind:value={start}/>
      <TextBox class="my-5 w-1/2 m-auto" label="Data de Fim" type="date" bind:value={end}/>
      
      <Selector class="my-5 w-1/2 m-auto" label="Processo" values={records} bind:value={record}/>
      <Selector class="my-5 w-1/2 m-auto" label="Especialidade" values={specialities} bind:value={speciality}/>
      
      <Button class="my-5 w-1/2 m-auto" type="submit" text="Gerar"/>
  </form>  