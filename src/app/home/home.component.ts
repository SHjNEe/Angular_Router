import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}
  onLoadServer() {
    console.log(this.router);
    this.router.navigate(["/servers", 1, "edit"], {
      queryParams: { allowEdit: "1" },
      fragment: "loading",
    });
  }
  onLogin() {
    return this.authService.login();
  }
  onLogout() {
    return this.authService.logout();
  }
}
