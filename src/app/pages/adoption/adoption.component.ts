import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  catchError,
  map,
  merge,
  Observable,
  of as observableOf,
  pipe,
  startWith,
  switchMap,
} from "rxjs";
import { AdoptionService } from "../../services/adoption.service";
import { CreateAdoptionComponent } from "./create/create.adoption.component";

@Component({
  selector: "ngx-adoption",
  templateUrl: "./adoption.component.html",
  styleUrls: ["./adoption.component.scss"],
})
export class AdoptionComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = [
    "photo",
    "namePet",
    "age",
    "status",
    "species",
    "description",
    "identificationAdopter",
    "nameAdopter",
    "addressAdopter",
    "telephoneAdopter",
    "vaccineId",
    "accion",
  ];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  adoptionData: any[] | undefined;

  filter = {
    namePet: null,
    age: null,
    photo: null,
    species: null,
    description: null,
    identificationAdopter: null,
    nameAdopter: null,
    addressAdopter: null,
    telephoneAdopter: null,
    vaccineId: null,
  };

  adoption = {
    namePet: "",
    age: "",
    photo: "",
    species: "",
    description: "",
    identificationAdopter: "",
    nameAdopter: "",
    addressAdopter: "",
    telephoneAdopter: "",
    vaccine: {
      id: "",
    },
  };

  constructor(private service: AdoptionService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .getAdoption(
              this.filter,
              this.paginator.pageIndex - 1 + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((adoptionData: any): any => {
          console.log(adoptionData);
          if (adoptionData == null) return [];
          this.resultsLength = adoptionData.totalItems;
          return adoptionData.items;
        })
      )
      .subscribe((adoptionData) => {
        this.adoptionData = adoptionData;
        this.dataSource = new MatTableDataSource(this.adoptionData);
      });
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(CreateAdoptionComponent, {
      data: {},
    });
  }

}
