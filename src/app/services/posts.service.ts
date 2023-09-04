import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';
import { Posts } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url = 'https://gorest.co.in/public/v2/posts';
  token = 'Bearer 7b9625ea089ee14c299eff40e83080f1a286fea5b83bb9cba8fd48afdd00f1fd';

  constructor(private HttpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  // Get Posts

  getPosts(): Observable<Posts[]> {
    return this.HttpClient.get<Posts[]>(this.url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get Posts with pagination

  getPostsWithPagination(page: number, perPage: number): Observable<Posts[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    return this.HttpClient.get<Posts[]>(this.url, { params, ...this.httpOptions })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Add Posts

  saveUser(user: Posts): Observable<Posts> {
    return this.HttpClient.post<Posts>(this.url, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
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
