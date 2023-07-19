import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { VaccineService } from "src/app/services/vaccine.service";
import { AdoptionService } from "src/app/services/adoption.service";

@Component({
  selector: "ngx-create-adoption",
  templateUrl: "./create.adoption.component.html",
  styleUrls: ["./create.adoption.component.scss"],
})
export class CreateAdoptionComponent {
  namePet = "";
  age = "";
  status = "";
  photo = "";
  species = "";
  description = "";
  identificationAdopter = "";
  nameAdopter = "";
  addressAdopter = "";
  telephoneAdopter = "";
  vaccines: any;
  selectedvaccineId: number = 0;
  selectedFile: any = null;

  constructor(
    private service: AdoptionService,
    public dialogRef: MatDialogRef<CreateAdoptionComponent>,

    public vaccineService: VaccineService
  ) {}

  ngOnInit() {
    this.vaccineService.getVaccine({}, 0, 50).subscribe((data: any) => {
      this.vaccines = data.items;
    });
  }

  saveAdoption() {
    let adoption = {
      namePet: this.namePet,
      age: this.age,
      status: this.status,
      photo: this.photo,
      species: this.species,
      description: this.description,
      identificationAdopter: this.identificationAdopter,
      nameAdopter: this.nameAdopter,
      addressAdopter: this.addressAdopter,
      telephoneAdopter: this.telephoneAdopter,
      vaccine: {
        id: this.selectedvaccineId,
      },
    };

    this.service.addAdoption(adoption).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setPetPhoto(file: any): void {
    this.selectedFile = file.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      if (reader!==null){
        this.photo = reader!.result!.toString();
        console.log(this.photo)
      }
    };
  }

}
