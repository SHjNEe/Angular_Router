import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };
  paramsSubcription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };
    this.paramsSubcription = this.route.params.subscribe((param) => {
      this.user = {
        id: param["id"],
        name: param["name"],
      };
    });
  }
  ngOnDestroy() {
    this.paramsSubcription.unsubscribe();
  }
}
