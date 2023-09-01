import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersCreatedComponent } from './users-created/users-created.component';
import { UsersReadComponent } from './users-read/users-read.component';
import { UsersUpdatedComponent } from './users-updated/users-updated.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';

const routes: Routes = [
  {
    path: 'created',
    component: UsersCreatedComponent
  },
  {
    path: 'read',
    component: UsersReadComponent
  },
  {
    path: 'update',
    component: UsersUpdatedComponent
  },
  {
    path: 'delete',
    component: UsersDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
