import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-created',
  templateUrl: './posts-created.component.html',
  styleUrls: ['./posts-created.component.scss']
})
export class PostsCreatedComponent {

  post = {} as Posts;
  isPostSaved = false;
  isModalVisible = false; 

  constructor(private postService: PostsService) { }

  savePosts(form: NgForm) {
    this.postService.saveUser(this.post).subscribe(
      (response) => {
        this.cleanForm(form);
        this.isPostSaved = true; 
        this.showModal(); 
        this.startTimer();
      },
      (error) => {
        console.error('Erro ao salvar usuário:', error);
      }
    );
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.post = {} as Posts; 
    this.isPostSaved = false;
  }

  showModal() {
    this.isModalVisible = true;
  }
  
  hideModal() {
    this.isModalVisible = false;
  }

  startTimer() {
    setTimeout(() => {
      this.hideModal();
    }, 3000);
  }
}
