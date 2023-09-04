import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss']
})
export class UsersDeleteComponent implements OnInit {
  user = {} as Users;
  users: Users[] = [];
  currentPage = 1;
  perPage = 10;
  isLoading = false;
  isUserSaved = false;
  showConfirmationModal = false;
  userToDelete: Users | null = null; 
  userToDeleteName = '';

  constructor(private userService: UsersService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;

    this.userService.getUsersWithPagination(this.currentPage, this.perPage)
      .subscribe({
        next: (data: Users[]) => {
          this.users = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        }
      });
  }

  deleteUser(user: Users) {
    this.userToDelete = user;
    this.userToDeleteName = user.name;
    this.showConfirmationModal = true;
  }

  confirmDelete() {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete).subscribe(() => {
        this.getUsers();
      });
      this.userToDelete = null;
      this.showConfirmationModal = false;
    }
  }
  
  cancelDelete() {
    this.userToDelete = null;
    this.showConfirmationModal = false;
  }

  nextPage(): void {
    this.currentPage++;
    this.getUsers();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers();
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as Users;
    this.isUserSaved = false;
  }
}
