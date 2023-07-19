import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from "src/app/services/appointment.service";
import { DiagnosisService } from "src/app/services/diagnosis.service";
import { DoctorService } from "src/app/services/doctors.service";
import { PetsService } from "src/app/services/pets.service";
import { formatDate } from "@angular/common";

@Component({
  selector: "ngx-create-appointment",
  templateUrl: "./create.appointment.component.html",
  styleUrls: ["./create.appointment.component.scss"],
})
export class CreateAppointmentComponent {

  descripcion = "";
  fechaRegistro = "";
  peso= "";
  temperatura="";
  pets : any;
  selectedIdPet: number = 0;
  doctor:any;
  selectedIdDoctor:number= 0;
  diagnosis:any;
  selectedIdDiagnosis:number= 0;


  constructor(private service:AppointmentService, public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    public diagnosisService: DiagnosisService,
    public doctorService: DoctorService,
    public petService: PetsService) {}


  ngOnInit() {
    this.petService.getPet({},0,50)
    .subscribe((data:any) => {
        this.pets = data.items;
    this.doctorService.getDoctors({},0,50)
        .subscribe((data: any) => {
            this.doctor = data.items;
    this.diagnosisService.getDiagnosis({},0,50)
      .subscribe((data: any) => {
        this.diagnosis = data.items;

          });
    });
  });

    }
    eventSelectPet(value: any){
      console.log(value);
    }



  saveAppointment() {
    this.fechaRegistro = this.formatDate(this.fechaRegistro);
    console.log(this.fechaRegistro);
    let appointment = {
      "descripcion" : this.descripcion,
      "fechaRegistro" : this.fechaRegistro,
      "peso": this.peso,
      "temperatura": this.temperatura,
      "pet" : {
        id: this.selectedIdPet
      },
      "doctor" : {
        id: this.selectedIdDoctor
      },
      "diagnosis" : {
        id: this.selectedIdDiagnosis
      }
    }

    this.service.addAppointment(appointment)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }

  formatDate(fechaRegistro: string): string {
    const format = "yyyy-MM-dd HH:mm";
    const locale = 'en-US';
    return formatDate(fechaRegistro, format, locale);
  }

}
