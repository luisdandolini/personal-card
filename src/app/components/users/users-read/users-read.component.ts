import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-users-read',
  templateUrl: './users-read.component.html',
  styleUrls: ['./users-read.component.scss']
})
export class UsersReadComponent implements OnInit{
  user = {} as Users;
  users: Users[] = [];
  currentPage = 1;
  perPage = 10;   
  isLoading = false;
  searchTerm: string = '';
  filteredUsers: Users[] = [];

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

  searchUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
