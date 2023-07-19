import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, map, merge, Observable, of as observableOf, pipe, startWith, switchMap } from "rxjs";
import { AppointmentService } from "../../services/appointment.service";
import { CreateAppointmentComponent } from "./create/create.appointment.component";
import { EditAppointmentComponent } from "./edit/edit.appointment.component";

@Component({
  selector: "ngx-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"],
})
export class AppointmentComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ["descripcion", "fechaRegistro", "peso", "temperatura", "nombrePet", "nombreDoctor", "nameDiagnosis" , "accion"];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  appointmentData: any[] | undefined;

  filter = {
    descripcion: null,
    fechaRegistro: null,
    peso: null,
    temperatura: null,
    petid: null,
    doctorid: null,
    diagnosisid: null,

  };

  appointment = {
    descripcion: "",
    fechaRegistro: "",
    peso: "",
    temperatura: "",
    pet: {
      id: "",
    },
    doctor: {
      id: "",
    },
    diagnosis: {
      diagnosisid: "",
    },
  };


  constructor(private service: AppointmentService,  public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.service
          .getAppointment(
            this.filter,
            this.paginator.pageIndex - 1 + 1,
            this.paginator.pageSize
          )
          .pipe(catchError(() => observableOf(null)));
      }),
        map((appointmentData: any): any => {
          console.log(appointmentData);
          if (appointmentData == null) return [];
          this.resultsLength = appointmentData.totalItems;
          return appointmentData.items;
        })
      )
      .subscribe((appointmentData) => {
        this.appointmentData = appointmentData;
        this.dataSource = new MatTableDataSource(this.appointmentData);
      });

    }
    openCreate(): void {
      const dialogRef = this.dialog.open(CreateAppointmentComponent, {
        data: {},
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Pendiente refrescar');
      });
    }
    registerAppointment() {
      this.service.addAppointment(this.appointment).subscribe((data: any) => {});
    }

    deleteAppointment(idAppointment : Number) {
      this.service.deleteAppointment(idAppointment).subscribe((data: any) => {
        console.log(data);
      });
    }
    editAppointment(appointment: any) {
      const dialogRef = this.dialog.open(EditAppointmentComponent, {
        data: {
          appointment: appointment
        },
      });
  }

}


