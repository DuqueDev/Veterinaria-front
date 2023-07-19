import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParentsService } from "src/app/services/parents.service";


@Component({
  selector: "ngx-edit-parents",
  templateUrl: "./edit.parents.component.html",
  styleUrls: ["./edit.parents.component.scss"],
})
export class EditParentsComponent {

  cedula = "";
  nombre= "";
  apellido= "";
  direccion= "";
  telefono= "";


  constructor(
    private service:ParentsService,
    public dialogRef: MatDialogRef<EditParentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data que recibo del componente parents")
    console.log(this.data);
    this.service.getParents({},0,50)
      .subscribe((data: any) => {

    });
    this.cedula = this.data.parent.cedula;
    this.nombre = this.data.parent.nombre;
    this.apellido = this.data.parent.apellido;
    this.direccion = this.data.parent.direccion;
    this.telefono = this.data.parent.telefono
  }

  updateParent() {

    let parents = {
      "cedula" : this.cedula,
      "nombre":  this.nombre,
      "apellido" : this.apellido,
      "direccion" : this.direccion,
      "telefono": this.telefono

    }
    this.service.editParent(this.data.parent.id, parents)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}
