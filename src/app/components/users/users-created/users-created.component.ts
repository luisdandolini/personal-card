import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-created',
  templateUrl: './users-created.component.html',
  styleUrls: ['./users-created.component.scss']
})
export class UsersCreatedComponent{

  user = {} as Users;
  isUserSaved = false;
  isModalVisible = false; 
  statusOptions: string[] = ["active", "inactive"];
  genderOptions: string[] = ["male", "female"];

  constructor(private userService: UsersService) { }

  saveUser(form: NgForm) {
    this.userService.saveUser(this.user).subscribe(
      (response) => {
        this.cleanForm(form);
        this.isUserSaved = true; 
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
    this.user = {} as Users; 
    this.isUserSaved = false;
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
