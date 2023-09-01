import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "", redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: "dashboard", 
    component: DashboardComponent
  },
  {
    path: "users",
    loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule)
  }, 
  {
    path: "posts",
    loadChildren: () => import('./components/posts/posts.module').then(m => m.PostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}