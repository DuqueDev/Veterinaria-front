import { Component } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from "src/app/services/product.service";


@Component({
  selector: "ngx-create-product",
  templateUrl: "./create.product.component.html",
  styleUrls: ["./create.product.component.scss"],
})
export class CreateProductComponent {

  tipoProducto = "";
  nombreProducto="";
  valor = "";
  cantidad = "";

  constructor(private service:ProductService, public dialogRef: MatDialogRef<CreateProductComponent> ) {}

  ngOnInit() {}

  saveProduct() {
    let product = {
      "tipoProducto": this.tipoProducto,
      "nombreProducto": this.nombreProducto,
      "valor": this.valor,
      "cantidad": this.cantidad
    }

    this.service.addProduct(product).subscribe((data: any) => {});
}
}
