import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsCreatedComponent } from './posts-created/posts-created.component';
import { PostsReadComponent } from './posts-read/posts-read.component';
import { PostsUpdatedComponent } from './posts-updated/posts-updated.component';
import { PostsDeleteComponent } from './posts-delete/posts-delete.component';

const routes: Routes = [
  {
    path: 'created',
    component: PostsCreatedComponent
  },
  {
    path: 'read',
    component: PostsReadComponent
  },
  {
    path: 'update',
    component: PostsUpdatedComponent
  },
  {
    path: 'delete',
    component: PostsDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }