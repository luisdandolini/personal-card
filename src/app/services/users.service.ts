import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'https://gorest.co.in/public/v2/users';
  token = 'Bearer 7b9625ea089ee14c299eff40e83080f1a286fea5b83bb9cba8fd48afdd00f1fd';

  constructor(private HttpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  // Get Users

  getUsers(): Observable<Users[]> {
    return this.HttpClient.get<Users[]>(this.url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get Users with pagination

  getUsersWithPagination(page: number, perPage: number): Observable<Users[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    return this.HttpClient.get<Users[]>(this.url, { params, ...this.httpOptions })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Add Users

  saveUser(user: Users): Observable<Users> {
    return this.HttpClient.post<Users>(this.url, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update Users

  updateUser(user: Users): Observable<Users> {
    return this.HttpClient.put<Users>(this.url + '/' + user.id, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Delete Users

  deleteUser(user: Users) {
    return this.HttpClient.delete<Users>(this.url + '/' + user.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
