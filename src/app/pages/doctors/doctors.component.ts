import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, map, startWith, switchMap } from "rxjs";
import { DoctorService } from "../../services/doctors.service";
import { merge, Observable, of as observableOf, pipe } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CreateDoctorsComponent } from "./create/create.doctors.component";
import { EditDoctorsComponent } from "./edit/edit.doctors.component";

@Component({
  selector: "ngx-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.scss"],
})
export class DoctorsComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ["nombre", "especialidad", "cedula", "accion"];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  doctorData: any[] | undefined;

  filter = {
    nombreDoctor: null,
    cedula: null,
    especialidad: null,
  };

  doctor = {
    nombre: "",
    especialidad: "",
    cedula: "",
  };

  editDoctors(doctor: any) {
    const dialogRef = this.dialog.open(EditDoctorsComponent, {
      data: {
        doctor: doctor
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }


  constructor(private service: DoctorService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .getDoctors(
              this.filter,
              this.paginator.pageIndex - 1 + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((doctorData: any): any => {
          console.log(doctorData);
          if (doctorData == null) return [];
          this.resultsLength = doctorData.totalItems;
          return doctorData.items;
        })
      )
      .subscribe((doctorData) => {
        this.doctorData = doctorData;
        this.dataSource = new MatTableDataSource(this.doctorData);
      });
  }
  openCreate(): void {
    const dialogRef = this.dialog.open(CreateDoctorsComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }
  registerDoctors() {
    this.service.addDoctors(this.doctor).subscribe((data: any) => {});
  }



  deleteDoctors(iddoctor : Number) {
    this.service.deleteDoctors(iddoctor).subscribe((data: any) => {
      console.log(data);
    });
  }

  onCreateConfirm(event:any): void {
    if (window.confirm("¿Deseas agregar el registro?")) {
      this.service.addDoctors(event.newData).subscribe(
        (data: any) => {
          event.confirm.resolve();
          this.getDoctors();
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
  getDoctors() {
    throw new Error("Method not implemented.");
  }

}


