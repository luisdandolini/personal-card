import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-read',
  templateUrl: './posts-read.component.html',
  styleUrls: ['./posts-read.component.scss']
})
export class PostsReadComponent implements OnInit{
  post = {} as Posts;
  posts: Posts[] = [];
  currentPage = 1;
  perPage = 6;    
  isLoading = false;

  constructor(private postService: PostsService) {
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

}