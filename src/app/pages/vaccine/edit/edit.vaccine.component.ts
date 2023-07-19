import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VaccineService } from "src/app/services/vaccine.service";


@Component({
  selector: "ngx-edit-vaccine",
  templateUrl: "./edit.vaccine.component.html",
  styleUrls: ["./edit.vaccine.component.scss"],
})
export class EditVaccineComponent {

  name= "";


  constructor(
    private service:VaccineService,
    public dialogRef: MatDialogRef<EditVaccineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data que recibo del componente vaccine")
    console.log(this.data);
    this.service.getVaccine({},0,50)
      .subscribe((data: any) => {

    });

    this.name= this.data.vaccine.name;


  }

  updateVaccine() {

    let vaccine = {
      "name":  this.name,
    }
    this.service.editVaccine(this.data.vaccine.id, vaccine)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}
