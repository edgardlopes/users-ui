import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from './page.model';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  
  getUsers(size: number = 0, page: number = 0): Observable<Page<User>>{
    return this.http.get<Page<User>>(`${environment.apiUrl}/users?size=${size}&page=${page}`)
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
  }

  create(user: User): Observable<any>{
    return this.http.post(`${environment.apiUrl}/users`, user)
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`)    
  }

  update(user: User, id: number): Observable<any>{
    return this.http.put(`${environment.apiUrl}/users/${id}`, user)
  }

  getSummary(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/users/summary`)
  }
}
