import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-updated',
  templateUrl: './posts-updated.component.html',
  styleUrls: ['./posts-updated.component.scss']
})
export class PostsUpdatedComponent implements OnInit {

  post = {} as Posts;
  posts: Posts[] = [];
  currentPage = 1;
  perPage = 10;
  isLoading = false;
  isPostSaved = false;
  editingMode = false;
  showModal = false;

  constructor(private postService: PostsService) {
    this.posts =[];
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

  updatedPost(form: NgForm) {
    if (this.post.id !== undefined) {
      this.postService.updatePosts(this.post).subscribe(() => {
        this.cleanForm(form);
        this.editingMode = false;
        this.getPosts();
        this.closeModal();
      });
    }
  }

  editPost(post: Posts) {
    this.post = { ...post };
    this.editingMode = true; 
    this.showModal = true; 
  }

  closeModal() {
    this.showModal = false; 
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
