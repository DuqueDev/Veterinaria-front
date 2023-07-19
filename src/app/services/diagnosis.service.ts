import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: "root",
})
export class DiagnosisService {
  constructor(private httpClient: HttpClient) {}

  public getDiagnosis(filter: any, currentPage: any, pageSize: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/diagnosis/search?page=${currentPage}&pageSize=${pageSize}`, filter, { headers });
  }

  public addDiagnosis(diagnosis: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/diagnosis`, diagnosis, { headers });
  }
  public editDiagnosis(iddiagnosis: Number, diagnosis: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.put(`${baseUrl}/diagnosis/${iddiagnosis}`,diagnosis,{ headers });
  }


  public deleteDiagnosis(iddiagnosis: Number) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.delete(`${baseUrl}/diagnosis/${iddiagnosis}`, { headers });
  }

  getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

}
