import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: "root",
})
export class DoctorService {
  constructor(private httpClient: HttpClient) {}

  public getDoctors(filter: any, currentPage: any, pageSize: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/doctors/search?page=${currentPage}&pageSize=${pageSize}`, filter, { headers });
  }

  public addDoctors(doctor: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/doctors`, doctor, { headers });
  }

  public editDoctors(idDoctor: Number, doctor: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.put(`${baseUrl}/doctors/${idDoctor}`,doctor,{ headers });
  }

  public deleteDoctors(idDoctor: Number) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.delete(`${baseUrl}/doctors/${idDoctor}`, { headers });
  }

  getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

}
