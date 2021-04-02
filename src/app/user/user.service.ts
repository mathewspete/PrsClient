import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl: string = "http://localhost:39623/api/Users"

  constructor(
    private http: HttpClient
  ) { }

  create(user: User): Observable<User>{
    return this.http.post(`${this.baseurl}`, user) as Observable<User>;
  }
  delete(user: User): Observable<User>{
    return this.http.delete(`${this.baseurl}/${user.id}`) as Observable<User>;
  }
  detail(id: number): Observable<User>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<User>;
  }
  edit(user: User): Observable<any>{
    return this.http.put(`${this.baseurl}/${user.id}`, user) as Observable<any>;
  }
  list(): Observable<User[]>{
    return this.http.get(`${this.baseurl}`) as Observable<User[]>;
  }
  login(username: string, pwd: string): Observable<User>{
    return this.http.get(`${this.baseurl}/${username}/${pwd}`) as Observable<User>;
  }




}
