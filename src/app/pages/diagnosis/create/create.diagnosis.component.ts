import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { DiagnosisService } from "src/app/services/diagnosis.service";


@Component({
  selector: "ngx-create-pets",
  templateUrl: "./create.diagnosis.component.html",
  styleUrls: ["./create.diagnosis.component.scss"],
})
export class CreateDiagnosisComponent {

  nameDiagnosis = "";

  constructor(private service:DiagnosisService, public dialogRef: MatDialogRef<CreateDiagnosisComponent> ) {}

  ngOnInit() {}

  saveDiagnosis() {
    let diagnosis = {
      "nameDiagnosis": this.nameDiagnosis,
    }

    this.service.addDiagnosis(diagnosis).subscribe((data: any) => {});
}
}
