import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, map, startWith, switchMap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CreateVaccineComponent } from "./create/create.vaccine.component";
import { EditVaccineComponent } from "./edit/edit.vaccine.component";
import { VaccineService } from "src/app/services/vaccine.service";

@Component({
  selector: "ngx-vaccine",
  templateUrl: "./vaccine.component.html",
  styleUrls: ["./vaccine.component.scss"],
})
export class VaccineComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ["name", "accion"];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  vaccineData: any[] | undefined;

  filter = {
    nameVaccine: null
  };

  vaccine = {
    name: ""
  };

  editVaccine(vaccine: any) {
    const dialogRef = this.dialog.open(EditVaccineComponent, {
      data: {
        vaccine: vaccine
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }


  constructor(private service: VaccineService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .getVaccine(
              this.filter,
              this.paginator.pageIndex - 1 + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((vaccineData: any): any => {
          console.log(vaccineData);
          if (vaccineData == null) return [];
          this.resultsLength = vaccineData.totalItems;
          return vaccineData.items;
        })
      )
      .subscribe((vaccineData) => {
        this.vaccineData = vaccineData;
        this.dataSource = new MatTableDataSource(this.vaccineData);
      });
  }
  openCreate(): void {
    const dialogRef = this.dialog.open(CreateVaccineComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }
  registerVaccine() {
    this.service.addVaccine(this.vaccine).subscribe((data: any) => {});
  }



  deleteVaccine(idVaccine : Number) {
    this.service.deleteVaccine(idVaccine).subscribe((data: any) => {
      console.log(data);
    });
  }

  onCreateConfirm(event:any): void {
    if (window.confirm("¿Deseas agregar el registro?")) {
      this.service.addVaccine(event.newData).subscribe(
        (data: any) => {
          event.confirm.resolve();
          this.getVaccine();
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
  getVaccine() {
    throw new Error("Method not implemented.");
  }

}


function observableOf(arg0: null): any {
  throw new Error("Function not implemented.");
}

