import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagnosisService } from "src/app/services/diagnosis.service";


@Component({
  selector: "ngx-edit-diagnosis",
  templateUrl: "./edit.diagnosis.component.html",
  styleUrls: ["./edit.diagnosis.component.scss"],
})
export class EditDiagnosisComponent {

  nameDiagnosis= "";


  constructor(
    private service:DiagnosisService,
    public dialogRef: MatDialogRef<EditDiagnosisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data que recibo del componente diagnosis")
    console.log(this.data);
    this.service.getDiagnosis({},0,50)
      .subscribe((data: any) => {

    });
    this.nameDiagnosis = this.data.diagnosis.nameDiagnosis;

  }

  updateDiagnosis() {

    let diagnosis = {
      "nameDiagnosis" : this.nameDiagnosis,

    }
    this.service.editDiagnosis(this.data.diagnosis.id, diagnosis)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}


