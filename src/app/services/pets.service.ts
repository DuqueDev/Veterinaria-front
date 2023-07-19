import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: "root",
})
export class PetsService {
  constructor(private httpClient: HttpClient) {}

  public getPet(filter: any, currentPage: any, pageSize: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/pet/search?page=${currentPage}&pageSize=${pageSize}`, filter, { headers });
  }

  public addPets(pet: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.post(`${baseUrl}/pet`, pet, { headers });
  }

  public editPets(idPet: Number, pets: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.put(`${baseUrl}/pet/${idPet}`, pets,{ headers });
  }

  public deletePets(idPet: Number) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
    return this.httpClient.delete(`${baseUrl}/pet/${idPet}`, { headers });
  }

  getToken() {

    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

}
