import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, map, startWith, switchMap } from "rxjs";

import { merge, Observable, of as observableOf, pipe } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CreateProductComponent } from "./create/create.product.component";
import { ProductService } from "src/app/services/product.service";
import { EditProductComponent } from "./edit/edit.product.component";

@Component({
  selector: "ngx-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ["tipoProducto", "nombreProducto", "valor", "cantidad", "accion"];
  resultsLength = 0;
  dataSource = new MatTableDataSource<any>();
  productData: any[] | undefined;

  filter = {
    tipoProducto: null,
    nombreProducto: null,
    valor: null,
    cantidad: null,
  };

  product = {
    tipoProducto: "",
    nombreProducto: "",
    valor: "",
    cantidad: "",
  };

  editProduct(product: any) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        product: product
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }


  constructor(private service: ProductService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service
            .getProduct(
              this.filter,
              this.paginator.pageIndex - 1 + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((productData: any): any => {
          console.log(productData);
          if (productData == null) return [];
          this.resultsLength = productData.totalItems;
          return productData.items;
        })
      )
      .subscribe((productData) => {
        this.productData = productData;
        this.dataSource = new MatTableDataSource(this.productData);
      });
  }
  openCreate(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pendiente refrescar');
    });
  }
  registerProduct() {
    this.service.addProduct(this.product).subscribe((data: any) => {});
  }



  deleteProduct(idproduct : Number) {
    this.service.deleteProduct(idproduct).subscribe((data: any) => {
      console.log(data);
    });
  }

  onCreateConfirm(event:any): void {
    if (window.confirm("¿Deseas agregar el registro?")) {
      this.service.addProduct(event.newData).subscribe(
        (data: any) => {
          event.confirm.resolve();
          this.getProduct();
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
  getProduct() {
    throw new Error("Method not implemented.");
  }

}





