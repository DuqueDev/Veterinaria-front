import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, map, startWith, switchMap } from "rxjs";
import { SymptomsService } from "../../services/symptoms.service";
import { merge, Observable, of as observableOf, pipe } from "rxjs";
import { CreateSymptomsComponent } from "./create/create.symptoms.component";
import { MatDialog } from "@angular/material/dialog";
import { EditSymptomsComponent } from "./edit/edit.symptoms.component";

@Component({
  selector: "ngx-symptoms",
  templateUrl: "./symptoms.component.html",
  styleUrls: ["./symptoms.component.scss"],
})
export class SymptomsComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["description", "nameDiagnosis" ,"accion"];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  symptomsData: any[] | undefined;

  filter = {
    description: null,
    diagnosisid: null,

  };

  symptoms = {
   description: "",
    diagnosis: {
      diagnosisid: "",
    },
  };

  editSymptoms(symptom: any) {
    const dialogRef = this.dialog.open(EditSymptomsComponent, {
      data: {
        symptom: symptom
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }

  constructor(private service: SymptomsService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .getSymptoms(
              this.filter,
              this.paginator.pageIndex - 1 + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((symptomsData: any): any => {
          console.log(symptomsData);
          if (symptomsData== null) return [];
          this.resultsLength = symptomsData.totalItems;
          return symptomsData.items;
        })
      )
      .subscribe((symptomsData) => {
        this.symptomsData = symptomsData;
        this.dataSource = new MatTableDataSource(this.symptomsData);
      });
  }
  openCreate(): void {
    const dialogRef = this.dialog.open(CreateSymptomsComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }
  registerSymptoms() {
    this.service.addSymptoms(this.symptoms).subscribe((data: any) => {});
  }

  deleteSymptoms(idsymptom : Number) {
    this.service.deleteSymptoms(idsymptom).subscribe((data: any) => {
      console.log(data);
    });
  }

  onCreateConfirm(event:any): void {
    if (window.confirm("¿Deseas agregar el registro?")) {
      this.service.addSymptoms(event.newData).subscribe(
        (data: any) => {
          event.confirm.resolve();

        },
        (error) => {
          event.confirm.reject();
          //this.showMessage('danger', 'Error', error.error)
        }
      );
    } else {
      event.confirm.reject();
    }
  }

}


