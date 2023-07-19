import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, map, startWith, switchMap } from "rxjs";
import { PetsService } from "../../services/pets.service";
import { merge, Observable, of as observableOf, pipe } from "rxjs";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreatePetsComponent } from "./create/create.pets.component";
import { EditPetsComponent } from "./edit/edit.pets.component";

@Component({
  selector: "ngx-pets",
  templateUrl: "./pets.component.html",
  styleUrls: ["./pets.component.scss"],
})
export class PetsComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["nombre", "edad", "especie", "raza", "color", "cedulaPropietario" ,"accion"];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  petData: any[] | undefined;

  filter = {
    nombrePet: null,
    edadPet: null,
    especie: null,
    raza: null,
    color: null,
    parentid: null,

  };

  pet = {
    nombre: "",
    edad: "",
    especie: "",
    raza: "",
    color: "",
    parent: {
      parentid: "",
    },
  };

  editPet(pet: any) {
    const dialogRef = this.dialog.open(EditPetsComponent, {
      data: {
        pet: pet
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }

  constructor(private service: PetsService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .getPet(
              this.filter,
              this.paginator.pageIndex - 1 + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((petData: any): any => {
          console.log(petData);
          if (petData == null) return [];
          this.resultsLength = petData.totalItems;
          return petData.items;
        })
      )
      .subscribe((petData) => {
        this.petData = petData;
        this.dataSource = new MatTableDataSource(this.petData);
      });
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(CreatePetsComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }

  registerParent() {
    this.service.addPets(this.pet).subscribe((data: any) => {});
  }



  deletePet(idPet : Number) {
    this.service.deletePets(idPet).subscribe((data: any) => {
      console.log(data);
    });
  }

  onCreateConfirm(event:any): void {
    if (window.confirm("¿Deseas agregar el registro?")) {
      this.service.addPets(event.newData).subscribe(
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
