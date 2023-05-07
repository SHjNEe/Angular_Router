import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((authenticate: boolean) => {
      if (authenticate) {
        return true;
      } else {
        this.router.navigate(["/"]);
      }
    });
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
// Phương thức `AuthGuard` được định nghĩa trong Angular Guard để kiểm tra xem người dùng đã đăng nhập hay chưa. 
// Nó sử dụng phương thức `isAuthenticated()` của `AuthService` để kiểm tra và trả về một Observable, Promise hoặc giá trị boolean để cho phép hoặc ngăn ngừa việc truy cập vào trang.
// Phương thức này có cơ chế hoạt động như sau:
// 1. Trong phương thức `canActivate()`, sử dụng phương thức `isAuthenticated()` của `AuthService` để kiểm tra đăng nhập.
// 2. Nếu đăng nhập thành công, phương thức sẽ trả về giá trị true để cho phép truy cập vào trang.
// 3. Nếu không đăng nhập thành công, phương thức sẽ chuyển hướng người dùng đến trang đăng nhập (sử dụng `this.router.navigate()`).
// 4. Trong phương thức `canActivateChild()`, gọi lại phương thức `canActivate()` để kiểm tra đăng nhập và trả về kết quả.
