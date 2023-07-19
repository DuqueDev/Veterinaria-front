import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/users.service";

@Component({
  selector: "veterinaria-login",
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  userName: string | undefined;
  password: string | undefined;

  constructor(
    public userService: UserService,
    public router: Router
  ) {}

  login() {
    const user = { userName: this.userName, password: this.password };
    this.userService.login(user).subscribe(
      (data: any) => {
        this.userService.setToken(data.token);
        //this.message.showMessage("info", "Info", "Autenticación exitosa");
        console.log("exito");
      },
      (error) => {

      }
    );
  }
}
