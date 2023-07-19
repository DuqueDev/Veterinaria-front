import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from "@angular/material/toolbar";
import { PetsService } from "src/app/services/pets.service";


@Component({
  selector: "ngx-edit-pets",
  templateUrl: "./edit.pets.component.html",
  styleUrls: ["./edit.pets.component.scss"],
})
export class EditPetsComponent {

  nombre = "";
  edad= "";
  especie = "";
  raza = "";
  color = "";


  constructor(
    private service:PetsService,
    public dialogRef: MatDialogRef<EditPetsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data que recibo del componente pets")
    console.log(this.data);
    this.service.getPet({},0,50)
      .subscribe((data: any) => {
    });
    this.nombre = this.data.pet.nombre;
    this.edad = this.data.pet.edad;
    this.especie = this.data.pet.especie;
    this.raza = this.data.pet.raza;
    this.color = this.data.pet.color;

  }

  updatePet() {

    let pets = {
      "nombre" : this.nombre,
      "edad": this.edad,
      "especie": this.especie,
      "raza": this.raza,
      "color": this.color,
    }

    this.service.editPets(this.data.pet.id, pets)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}
