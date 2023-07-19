import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: "root",
})
export class VaccineService {
  constructor(private httpClient: HttpClient) {}

  public getVaccine(filter: any, currentPage: any, pageSize: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/vaccine/search?page=${currentPage}&pageSize=${pageSize}`, filter, { headers });
  }

  public addVaccine(vaccine: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/vaccine`, vaccine, { headers });
  }

  public editVaccine(idVaccine: Number, vaccine: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.put(`${baseUrl}/vaccine/${idVaccine}`,vaccine,{ headers });
  }

  public deleteVaccine(idVaccine: Number) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.delete(`${baseUrl}/vaccine/${idVaccine}`, { headers });
  }

  getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

}
