import { NgModule } from "@angular/core"
import { PreloadAllModules, RouterModule, type Routes } from "@angular/router"
import { AuthGuard } from "./core/guards/auth.guard"

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuard], // Protected route
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "ar",
    loadChildren: () => import("./pages/ar/ar.module").then((m) => m.ArPageModule),
    canActivate: [AuthGuard], // Protected route
  },
  {
    path: "login",
    loadChildren: () => import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () => import("./pages/register/register.module").then((m) => m.RegisterPageModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
