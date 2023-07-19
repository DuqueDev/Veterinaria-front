import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { DiagnosisService } from "src/app/services/diagnosis.service";
import { SymptomsService } from "src/app/services/symptoms.service";

@Component({
  selector: "ngx-create-symptoms",
  templateUrl: "./create.symptoms.component.html",
  styleUrls: ["./create.symptoms.component.scss"],
})
export class CreateSymptomsComponent {

  description = "";
  nameDiagnosis= "";
  diagnosis : any;
  selectedIdDiagnosis: number = 0;


  constructor(
    private service:SymptomsService,
    public dialogRef: MatDialogRef<CreateSymptomsComponent>,
    public diagnosisService: DiagnosisService) {}

  ngOnInit() {
    this.diagnosisService.getDiagnosis({},0,50)
      .subscribe((data: any) => {
        this.diagnosis = data.items;
    });
  }

  eventSelectDiagnosis(value: any){
    console.log(value);
  }

  saveSymptom() {

    let symptoms = {
      "description" : this.description,
      "diagnosis" : {
        id: this.selectedIdDiagnosis
      }
    }
    this.service.addSymptoms(symptoms)
    .subscribe((data: any) => {
      console.log(data);
    },

    error => {
      console.log(error);
    });
  }
}
