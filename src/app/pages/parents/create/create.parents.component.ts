import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { ParentsService } from "src/app/services/parents.service";

@Component({
  selector: "ngx-create-parents",
  templateUrl: "./create.parents.component.html",
  styleUrls: ["./create.parents.component.scss"],
})
export class CreateParentsComponent {

  cedula = "";
  nombre = "";
  apellido = "";
  direccion = "";
  telefono = "";

  constructor(private service: ParentsService, public dialogRef: MatDialogRef<CreateParentsComponent> ) {}

  ngOnInit() {}

  save() {
    let parent = {
      "cedula": this.cedula,
      "nombre" : this.nombre,
      "apellido" : this.apellido,
      "direccion": this.direccion,
      "telefono": this.telefono
    }
    this.service.addParents(parent).subscribe((data: any) => {});
  }

}
