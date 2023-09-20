import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersCreatedComponent } from './users-created/users-created.component';
import { UsersReadComponent } from './users-read/users-read.component';
import { UsersUpdatedComponent } from './users-updated/users-updated.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    UsersCreatedComponent,
    UsersReadComponent,
    UsersUpdatedComponent,
    UsersDeleteComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }
