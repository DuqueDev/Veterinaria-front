import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from "src/app/services/product.service";


@Component({
  selector: "ngx-edit-product",
  templateUrl: "./edit.product.component.html",
  styleUrls: ["./edit.product.component.scss"],
})
export class EditProductComponent {

  tipoProducto = "";
  nombreProducto= "";
  valor= "";
  cantidad="";

  constructor(
    private service:ProductService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log("data que recibo del componente doctors")
    console.log(this.data);
    this.service.getProduct({},0,50)
      .subscribe((data: any) => {

    });
    this.tipoProducto= this.data.product.tipoProducto;
    this.nombreProducto = this.data.product.nombreProducto;
    this.valor = this.data.product.valor;
    this.cantidad= this.data.product.cantidad;

  }

  updateProduct() {

    let product = {
      "tipoProducto" : this.tipoProducto,
      "nombreProducto":  this.nombreProducto,
      "valor" : this.valor,
      "cantidad" : this.cantidad
    }
    this.service.editProduct(this.data.product.idproduct, product)
    .subscribe((data: any) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}
