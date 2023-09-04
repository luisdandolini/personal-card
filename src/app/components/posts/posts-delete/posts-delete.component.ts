import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-delete',
  templateUrl: './posts-delete.component.html',
  styleUrls: ['./posts-delete.component.scss']
})
export class PostsDeleteComponent implements OnInit {
  
  post = {} as Posts;
  posts: Posts[] = [];
  currentPage = 1;
  perPage = 10;
  isLoading = false;
  isPostSaved = false;
  showConfirmationModal = false;
  postToDelete: Posts | null = null; 
  postToDeleteID = 0;

  constructor(private postService: PostsService) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.isLoading = true;

    this.postService.getPostsWithPagination(this.currentPage, this.perPage)
      .subscribe({
        next: (data: Posts[]) => {
          this.posts = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        }
      });
  }

  deletePost(post: Posts) {
    this.postToDelete = post;
    this.postToDeleteID = post.id;
    this.showConfirmationModal = true;
  }

  confirmDelete() {
    if (this.postToDelete) {
      this.postService.deleteUser(this.postToDelete).subscribe(() => {
        this.getPosts();
      });
      this.postToDelete = null;
      this.showConfirmationModal = false;
    }
  }
  
  cancelDelete() {
    this.postToDelete = null;
    this.showConfirmationModal = false;
  }

  nextPage(): void {
    this.currentPage++;
    this.getPosts();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPosts();
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.post = {} as Posts;
    this.isPostSaved = false;
  }

}
