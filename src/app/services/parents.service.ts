import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: "root",
})
export class ParentsService {
  constructor(private httpClient: HttpClient) {}

  public getParents(filter: any, currentPage: any, pageSize: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/parents/search?page=${currentPage}&pageSize=${pageSize}`, filter, { headers });
  }

  public addParents(parent: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/parents`, parent, { headers });
  }
  public editParent(idParent: number, parent: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.put(`${baseUrl}/parents/${idParent}`, parent, { headers });
  }
  public deleteParents(idParent: Number) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.delete(`${baseUrl}/parents/${idParent}`, { headers });
  }

  getToken() {

    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

}
