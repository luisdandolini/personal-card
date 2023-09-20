import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-updated',
  templateUrl: './users-updated.component.html',
  styleUrls: ['./users-updated.component.scss']
})
export class UsersUpdatedComponent implements OnInit {
  user = {} as Users;
  users: Users[] = [];
  currentPage = 1;
  perPage = 10;
  isLoading = false;
  isUserSaved = false;
  editingMode = false;
  showModal = false;
  statusOptions: string[] = ["active", "inactive"];
  genderOptions: string[] = ["male", "female"];

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

  updatedUsers(form: NgForm) {
    if (this.user.id !== undefined) {
      this.userService.updateUser(this.user).subscribe(() => {
        this.cleanForm(form);
        this.editingMode = false;
        this.getUsers();
        this.closeModal();
      });
    }
  }

  editUser(user: Users) {
    this.user = { ...user };
    this.editingMode = true; 
    this.showModal = true; 
  }

  closeModal() {
    this.showModal = false; 
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
