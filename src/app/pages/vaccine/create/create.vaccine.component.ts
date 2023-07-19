import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { VaccineService } from "src/app/services/vaccine.service";


@Component({
  selector: "ngx-create-vaccine",
  templateUrl: "./create.vaccine.component.html",
  styleUrls: ["./create.vaccine.component.scss"],
})
export class CreateVaccineComponent {

  name = "";

  constructor(private service:VaccineService, public dialogRef: MatDialogRef<CreateVaccineComponent> ) {}

  ngOnInit() {}

  saveVaccine() {
    let vaccine = {
      "name": this.name,

    }

    this.service.addVaccine(vaccine).subscribe((data: any) => {});
}
}
