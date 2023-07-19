import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from "src/app/services/doctors.service";


@Component({
  selector: "ngx-edit-doctors",
  templateUrl: "./edit.doctors.component.html",
  styleUrls: ["./edit.doctors.component.scss"],
})
export class EditDoctorsComponent {

  cedula = "";
  nombre= "";
  especialidad= "";

  constructor(
    private service:DoctorService,
    public dialogRef: MatDialogRef<EditDoctorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data que recibo del componente doctors")
    console.log(this.data);
    this.service.getDoctors({},0,50)
      .subscribe((data: any) => {

    });
    this.cedula = this.data.doctor.cedula;
    this.nombre = this.data.doctor.nombre;
    this.especialidad = this.data.doctor.especialidad;

  }

  updateDoctor() {

    let doctor = {
      "cedula" : this.cedula,
      "nombre":  this.nombre,
      "especialidad" : this.especialidad,
    }
    this.service.editDoctors(this.data.doctor.id, doctor)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}
