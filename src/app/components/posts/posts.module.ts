import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostsCreatedComponent } from './posts-created/posts-created.component';
import { PostsReadComponent } from './posts-read/posts-read.component';
import { PostsUpdatedComponent } from './posts-updated/posts-updated.component';
import { PostsDeleteComponent } from './posts-delete/posts-delete.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostsComponent,
    PostsCreatedComponent,
    PostsReadComponent,
    PostsUpdatedComponent,
    PostsDeleteComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule
  ]
})
export class PostsModule { }
