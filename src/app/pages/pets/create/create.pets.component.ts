import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { PetsService } from "src/app/services/pets.service";

@Component({
  selector: "ngx-create-pets",
  templateUrl: "./create.pets.component.html",
  styleUrls: ["./create.pets.component.scss"],
})
export class CreatePetsComponent {

  nombre = "";
  edad = "";
  especie = "";
  raza="";
  color= "";
  cedulaPropietario= ""



  constructor(private service:PetsService, public dialogRef: MatDialogRef<CreatePetsComponent> ) {}

  ngOnInit() {}

  savePet() {

    let pet = {
      "nombre" : this.nombre,
      "edad" : this.edad,
      "especie": this.especie,
      "raza": this.raza,
      "color": this.color,
      "cedula": this.cedulaPropietario
    }
    this.service.addPets(pet)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }

}
