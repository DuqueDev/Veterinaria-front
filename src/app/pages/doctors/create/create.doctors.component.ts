import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from "src/app/services/doctors.service";


@Component({
  selector: "ngx-create-doctors",
  templateUrl: "./create.doctors.component.html",
  styleUrls: ["./create.doctors.component.scss"],
})
export class CreateDoctorsComponent {

  nombre = "";
  especialidad="";
  cedula = "";

  constructor(private service:DoctorService, public dialogRef: MatDialogRef<CreateDoctorsComponent> ) {}

  ngOnInit() {}

  saveDoctors() {
    let doctor = {
      "nombre": this.nombre,
      "especialidad": this.especialidad,
      "cedula": this.cedula
    }

    this.service.addDoctors(doctor).subscribe((data: any) => {});
}
}
