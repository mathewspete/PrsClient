import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemService } from '../system.service';
import { User } from '../user/user.class';
import { Request } from './request.class';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseurl: string = `${this.syssvc.domain}/api/Requests`


  constructor(
    private syssvc: SystemService,
    private http: HttpClient
  ) { }

  create(request: Request): Observable<Request>{
    return this.http.post(`${this.baseurl}`, request) as Observable<Request>;
  }
  delete(request: Request): Observable<Request>{
    return this.http.delete(`${this.baseurl}/${request.id}`) as Observable<Request>;
  }
  detail(id: number): Observable<Request>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Request>;
  }
  edit(request: Request): Observable<any>{
    return this.http.put(`${this.baseurl}/${request.id}`, request) as Observable<any>;
  }
  list(): Observable<Request[]>{
    return this.http.get(`${this.baseurl}`) as Observable<Request[]>;
  }
  pending(): Observable<Request[]>{
    return this.http.get(`${this.baseurl}/pending`) as Observable<Request[]>;
  }
  new(request: Request): Observable<any>{
    return this.http.put(`${this.baseurl}/${request.id}`, request) as Observable<any>;
  }
  review(request: Request): Observable<any>{
    return this.http.put(`${this.baseurl}/review/${request.id}`, request) as Observable<any>;
  }
  approve(request: Request): Observable<any>{
    return this.http.put(`${this.baseurl}/approve/${request.id}`, request) as Observable<any>;
  }
  reject(request: Request): Observable<any>{
    return this.http.put(`${this.baseurl}/reject/${request.id}`, request) as Observable<any>;
  }
  nonUser(user: User): Observable<Request[]>{
    return this.http.get(`${this.baseurl}/pending/${user.id}`) as Observable<Request[]>;
  }




}
