import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, map, startWith, switchMap } from "rxjs";
import { ParentsService } from "../../services/parents.service";
import { merge, Observable, of as observableOf, pipe } from "rxjs";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateParentsComponent } from "./create/create.parents.component";
import { EditParentsComponent } from "./edit/edit.parents.component";

@Component({
  selector: "ngx-parents",
  templateUrl: "./parents.component.html",
  styleUrls: ["./parents.component.scss"],
})
export class ParentsComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["cedula", "nombre", "apellido", "direccion", "telefono" ,"accion"];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  parentData: any[] | undefined;

  filter = {
    cedulaParent: null,
    nombreParent: null,
    apellido: null,
    direccion: null,
    telefono: null,

  };

  parent = {
    cedula: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",

  };
  editParent(parent: any) {
    const dialogRef = this.dialog.open(EditParentsComponent, {
      data: {
        parent: parent
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }

  constructor(private service: ParentsService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .getParents(
              this.filter,
              this.paginator.pageIndex - 1 + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((parentData: any): any => {
          console.log(parentData);
          if (parentData == null) return [];
          this.resultsLength = parentData.totalItems;
          return parentData.items;
        })
      )
      .subscribe((parentData) => {
        this.parentData = parentData;
        this.dataSource = new MatTableDataSource(this.parentData);
      });
  }


  openCreate(): void {
    const dialogRef = this.dialog.open(CreateParentsComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }
  registerParent() {
    this.service.addParents(this.parent).subscribe((data: any) => {});
  }

  deleteParents(idParent : Number) {
    this.service.deleteParents(idParent).subscribe((data: any) => {
      console.log(data);
    });
  }

  onCreateConfirm(event:any): void {
    if (window.confirm("¿Deseas agregar el registro?")) {
      this.service.addParents(event.newData).subscribe(
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





