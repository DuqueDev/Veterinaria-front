import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: "root",
})
export class SymptomsService {
  constructor(private httpClient: HttpClient) {}

  public getSymptoms(filter: any, currentPage: any, pageSize: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/symptoms/search?page=${currentPage}&pageSize=${pageSize}`, filter, { headers });
  }

  public addSymptoms(symptom: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/symptoms`, symptom, { headers });
  }

  public editSymptom(idSymptom: number, symptom: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.put(`${baseUrl}/symptoms/${idSymptom}`, symptom, { headers });
  }

  public deleteSymptoms(idsymptom: Number) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.delete(`${baseUrl}/symptoms/${idsymptom}`, { headers });
  }

  getToken() {

    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
}
