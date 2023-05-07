import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";
interface Server {
  id: number;
  name: string;
  status: string;
}
@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params["id"]);
  }
}

// Phương thức `ServerResolver` được định nghĩa trong Angular Resolver để tải dữ liệu trước khi hiển thị trang.
// Nó sử dụng phương thức `getServer()` của `ServersService` để tải thông tin chi tiết của một server dựa trên `id` được truyền vào.
// Phương thức này có cơ chế hoạt động như sau:
// 1. Trong phương thức `resolve()`, sử dụng phương thức `getServer()` của `ServersService` để tải thông tin chi tiết của một server dựa trên `id` được truyền vào.
// 2. Phương thức `resolve()` trả về một Observable, Promise hoặc giá trị Server để cung cấp dữ liệu cho trang hiển thị.
