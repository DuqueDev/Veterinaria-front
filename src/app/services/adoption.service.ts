import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import baseUrl from "./helper";

@Injectable({
  providedIn: "root",
})
export class AdoptionService {
  constructor(private httpClient: HttpClient) {}

  public getAdoption(filter: any, currentPage: any, pageSize: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/adoption/search?page=${currentPage}&pageSize=${pageSize}`, filter, { headers });
  }

  public addAdoption(adoption: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/adoption`, adoption, { headers });
  }

  public editAdoption(idAdoption: Number, adoption: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.put(`${baseUrl}/adoption/${idAdoption}`, adoption, { headers });
  }

  public deleteAdoption(idAdoption: Number) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.delete(`${baseUrl}/adoption/${idAdoption}`, { headers });
  }

  getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

}
