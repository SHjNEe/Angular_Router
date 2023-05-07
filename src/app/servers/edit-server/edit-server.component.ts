import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { query } from "@angular/animations";
import { CanComponentDeactivate } from "./can-deactive-guard.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;
  changedSave = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParam: Params) => {
      this.allowEdit = queryParam["allowEdit"] === "1" ? true : false;
      console.log(queryParam);
    });
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changedSave = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  // Phương thức `canDeactivate()` được định nghĩa trong Angular Guard để kiểm tra xem người dùng có muốn rời khỏi trang hay không. Nó trả về một Observable, 
  // Promise hoặc giá trị boolean để cho phép hoặc ngăn ngừa việc rời khỏi trang.
  // 1. Nếu biến `allowEdit` là false (không cho phép chỉnh sửa), phương thức sẽ trả về giá trị true để cho phép rời khỏi trang.
  // 2. Nếu người dùng đã thay đổi thông tin của `server` (tên hoặc trạng thái) hoặc đã thực hiện lưu thay đổi nhưng chưa lưu vào server (`changedSave` là false), phương thức sẽ trả về một confirm dialog để xác nhận việc rời khỏi trang. Nếu người dùng chọn "OK", phương thức sẽ trả về giá trị true để cho phép rời khỏi trang, ngược lại sẽ trả về giá trị false để ngăn ngừa việc rời khỏi trang.
  // 3. Nếu không có thay đổi nào hoặc người dùng đã lưu thay đổi vào server, phương thức sẽ trả về giá trị true để cho phép rời khỏi trang.
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if (
      this.serverName !== this.server.name ||
      this.server.status !== this.serverStatus ||
      !this.changedSave
    ) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }
}
