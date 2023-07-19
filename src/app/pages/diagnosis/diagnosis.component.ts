import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, map, startWith, switchMap } from "rxjs";
import { merge, Observable, of as observableOf, pipe } from "rxjs";
import { DiagnosisService } from "src/app/services/diagnosis.service";
import { CreateDiagnosisComponent } from "./create/create.diagnosis.component";
import { EditDiagnosisComponent } from "./edit/edit.diagnosis.component";

@Component({
  selector: "ngx-diagnosis",
  templateUrl: "./diagnosis.component.html",
  styleUrls: ["./diagnosis.component.scss"],
})
export class DiagnosisComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["nameDiagnosis" ,"accion"];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  diagnosisData: any[] | undefined;

  filter = {
    nameDiagnosis: null,
  };
  editDiagnosis(diagnosis: any) {
    const dialogRef = this.dialog.open(EditDiagnosisComponent, {
      data: {
        diagnosis: diagnosis
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }


  constructor(private service: DiagnosisService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .getDiagnosis(
              this.filter,
              this.paginator.pageIndex - 1 + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((diagnosisData: any): any => {
          console.log(diagnosisData);
          if (diagnosisData == null) return [];
          this.resultsLength = diagnosisData.totalItems;
          return diagnosisData.items;
        })
      )
      .subscribe((diagnosisData) => {
        this.diagnosisData = diagnosisData;
        this.dataSource = new MatTableDataSource(this.diagnosisData);
      });
  }
  openCreate(): void {
    const dialogRef = this.dialog.open(CreateDiagnosisComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }

  deleteDiagnosis(idDiagnosis : Number) {
    this.service.deleteDiagnosis(idDiagnosis).subscribe((data: any) => {
      console.log(data);
    });
  }


}
