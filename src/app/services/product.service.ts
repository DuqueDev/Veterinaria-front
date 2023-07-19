import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getProduct(filter: any, currentPage: any, pageSize: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/product/search?page=${currentPage}&pageSize=${pageSize}`, filter, { headers });
  }

  public addProduct(product: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/product`, product, { headers });
  }

  public editProduct(idproduct: Number, product: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.put(`${baseUrl}/product/${idproduct}`,product,{ headers });
  }

  public deleteProduct(idproduct: Number) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.delete(`${baseUrl}/product/${idproduct}`,{ headers });
  }

  getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

}
