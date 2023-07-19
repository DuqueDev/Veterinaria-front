import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdoptionService } from "src/app/services/adoption.service";
import { VaccineService } from "src/app/services/vaccine.service";


@Component({
  selector: "ngx-edit-adoption",
  templateUrl: "./edit.adoption.component.html",
  styleUrls: ["./edit.adoption.component.scss"],
})
export class EditAdoptionComponent {

  namePet = "";
  age = "";
  status= "";
  photo="";
  species= "";
  description = "";
  identificationAdopter= "";
  nameAdopter= "";
  addressAdopter= "";
  telephoneAdopter= "";
  vaccine:any;
  selectedvaccineId:number=0;

  constructor(private service:AdoptionService, public dialogRef: MatDialogRef<EditAdoptionComponent>,
    public vaccineService: VaccineService,

    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {

    this.vaccineService.getVaccine({},0,50)
      .subscribe((data: any) => {
        this.vaccine
         = data.items;

          });


          this.namePet = this.data.adoption.namePet;
          this.age = this.data.adoption.age;
          this.status = this.data.adoption.status;
          this.photo = this.data.adoption.photo;
          this.species = this.data.adoption.species;
          this.description = this.data.adoption.description;
          this.identificationAdopter = this.data.adoption.identificationAdopter;
          this.nameAdopter = this.data.adoption.nameAdopter;
          this.addressAdopter = this.data.adoption.addressAdopter;
          this.telephoneAdopter = this.data.adoption.telephoneAdopter;

          this.selectedvaccineId = this.data.adoption.vaccine.id;
      }


  updateAdoption() {

      let adoptions  = {
        "namePet" : this.namePet,
        "age" : this.age,
        "status": this.status,
        "photo": this.photo,
        "species": this.species,
        "description": this.description,
        "identificationAdopter": this.identificationAdopter,
        "nameAdopter" : this.nameAdopter,
        "addressAdopter" : this.addressAdopter,
        "telephoneAdopter" : this.telephoneAdopter,
        "vaccine" : {
          id: this.selectedvaccineId
        },

      }

    this.service.editAdoption(this.data.addAdoption.id,adoptions)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}



