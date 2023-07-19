import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagnosisService } from "src/app/services/diagnosis.service";
import { SymptomsService } from "src/app/services/symptoms.service";

@Component({
  selector: "ngx-edit-symptoms",
  templateUrl: "./edit.symptoms.component.html",
  styleUrls: ["./edit.symptoms.component.scss"],
})
export class EditSymptomsComponent {

  description = "";
  nameDiagnosis= "";
  diagnosis : any;
  selectedIdDiagnosis: number = 0;

  constructor(
    private service:SymptomsService,
    public dialogRef: MatDialogRef<EditSymptomsComponent>,
    public diagnosisService: DiagnosisService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data que recibo del componente symptoms")
    console.log(this.data);
    this.diagnosisService.getDiagnosis({},0,50)
      .subscribe((data: any) => {
        this.diagnosis = data.items;
    });
    this.description = this.data.symptom.description;
    this.selectedIdDiagnosis = this.data.symptom.diagnosis.id;
  }

  updateSymptom() {

    let symptoms = {
      "description" : this.description,
      "diagnosis" : {
        id: this.selectedIdDiagnosis
      }
    }
    this.service.editSymptom(this.data.symptom.idsymptom, symptoms)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}
