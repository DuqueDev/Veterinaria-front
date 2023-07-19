import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagnosisService } from "src/app/services/diagnosis.service";
import { AppointmentService } from "src/app/services/appointment.service";
import { PetsService } from "src/app/services/pets.service";
import { DoctorService } from "src/app/services/doctors.service";

@Component({
  selector: "ngx-edit-appointment",
  templateUrl: "./edit.appointment.component.html",
  styleUrls: ["./edit.appointment.component.scss"],
})
export class EditAppointmentComponent {

  descripcion = "";
  fechaRegistro= "";
  peso="";
  temperatura = "";
  pet:any;
  SelectedIdPets:number= 0;
  doctor:any;
  SelectedIdDoctor:number=0;
  diagnosis : any;
  selectedIdDiagnosis: number = 0;

  constructor(
    private service:AppointmentService,
    public dialogRef: MatDialogRef<EditAppointmentComponent>,
    public petService: PetsService,
    public doctorService:DoctorService,
    public diagnosisService: DiagnosisService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
      this.petService.getPet({},0,50)
      .subscribe((data:any) => {
          this.pet = data.items;
      this.doctorService.getDoctors({},0,50)
          .subscribe((data: any) => {
              this.doctor = data.items;
      this.diagnosisService.getDiagnosis({},0,50)
        .subscribe((data: any) => {
          this.diagnosis = data.items;
        });
      });
    });

          this.descripcion = this.data.appointment.descripcion;
          this.fechaRegistro = this.data.appointment.fechaRegistro;
          this.peso = this.data.appointment.peso;
          this.temperatura = this.data.appointment.temperatura;
          this.SelectedIdPets = this.data.appointment.pet.id;
          this.SelectedIdDoctor = this.data.appointment.doctor.id;
          this.selectedIdDiagnosis = this.data.appointment.diagnosis.id;
      }


  updateAppointment() {

    let appointments = {
      "descripcion" : this.descripcion,
      "fechaRegistro" : this.fechaRegistro,
      "peso" : this.peso,
      "temperatura" : this.temperatura,
      "pet" : {
        "id" : this.SelectedIdPets
        },
      "doctor" : {
        "id" : this.SelectedIdDoctor
        },
      "diagnosis" : {
        id: this.selectedIdDiagnosis
      }
    }

    this.service.editAppointment(this.data.appointment.id,appointments)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}


