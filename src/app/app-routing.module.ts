import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactive-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "servers",
    component: ServersComponent,
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolver },
        //Trong đoạn mã này, `resolve` là một thuộc tính của đối tượng Route trong Angular Router.
        //Nó được sử dụng để đăng ký một Resolver, hay một hoạt động tải dữ liệu trước khi hiển thị trang.
        // `ServerResolver` là một Resolver được định nghĩa để tải dữ liệu của một server dựa trên `id` được truyền vào.
        // Khi người dùng truy cập vào đường dẫn `/:id`, Angular Router sẽ trước tiên gọi Resolver để tải dữ liệu của server có `id` tương ứng. Sau đó, nó sẽ chuyển dữ liệu này vào component `ServerComponent` để hiển thị trên trang.
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
        //Trong đoạn mã này, `canDeactivate` là một thuộc tính của đối tượng Route trong Angular Router.
        // Nó được sử dụng để đăng ký một hoạt động kiểm tra trước khi người dùng rời khỏi trang,
        // để xác định xem liệu họ có muốn lưu thay đổi hay không.
        //`CanDeactivateGuard` là một Angular Guard được định nghĩa để kiểm tra xem người dùng có muốn rời khỏi trang hay không. Nếu người dùng muốn rời khỏi trang, phương thức `canDeactivate()` sẽ được gọi để xác định xem liệu họ có muốn lưu thay đổi hay không.
      },
    ],
  },

  {
    path: "users",
    component: UsersComponent,
    children: [
      {
        path: ":id/:name",
        component: UserComponent,
      },
    ],
  },
  // {
  //   path: "not-found",
  //   component: PageNotFoundComponent,
  // },
  {
    path: "not-found",
    component: ErrorPageComponent,
    //Pass data to show message
    data: {
      message: "Page not found",
    },
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  // `{useHash: true}` là một đối tượng tùy chọn được sử dụng để cấu hình Location Strategy của Angular Router.
  // Khi `useHash` được đặt là `true`, Angular Router sẽ sử dụng HashLocationStrategy để xử lý các URL của ứng dụng.
  exports: [RouterModule],
})
export class AppRoutingModule {}
// Location Strategy là một phần của Angular Router và được sử dụng để xác định cách mà Angular Router sẽ xử lý các URL. 
// Location Strategy có hai loại chính: HashLocationStrategy và PathLocationStrategy.
// 1. HashLocationStrategy:
// HashLocationStrategy sử dụng ký tự "#"(hash) trên URL để chỉ định vị trí của trang. Khi người dùng thay đổi URL, trình duyệt sẽ không gửi yêu cầu đến máy chủ, nó chỉ thay đổi phần đằng sau ký tự "#" trên URL. Vì vậy, đây là một phương pháp tốt để sử dụng khi bạn không cần phải xử lý các yêu cầu đến máy chủ.
// 2. PathLocationStrategy:
// PathLocationStrategy sử dụng đường dẫn đầy đủ trên URL để xác định vị trí của trang. Khi người dùng thay đổi URL, trình duyệt sẽ gửi yêu cầu đến máy chủ và máy chủ sẽ trả về nội dung tương ứng với URL đó. Vì vậy, đây là một phương pháp tốt để sử dụng khi bạn cần phải xử lý các yêu cầu đến máy chủ và trả về nội dung tương ứng.
// Để sử dụng Location Strategy trong Angular, bạn cần import `LocationStrategy` và `HashLocationStrategy` hoặc `PathLocationStrategy` từ module `@angular/common` và cung cấp cho nó trong phương thức `bootstrapModule()` của AppModule.