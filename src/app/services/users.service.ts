import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import baseUrl from "./helper";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public addUser(user: any) {
    return this.httpClient.post(`${baseUrl}/auth/signup`, user);
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/auth/login`, user);
  }

  setToken(token:any) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.get("token");
  }

}
