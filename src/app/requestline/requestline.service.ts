import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requestline } from './requestline.class';

@Injectable({
  providedIn: 'root'
})
export class RequestlineService {

  // baseurl: string = "http://localhost:39623/api/Requestlines"
  baseurl: string = "http://192.168.200.170:45456/api/Requestlines"




  constructor(
    private http: HttpClient
  ) { }

  create(requestline: Requestline): Observable<Requestline>{
    return this.http.post(`${this.baseurl}`, requestline) as Observable<Requestline>;
  }
  delete(requestline: Requestline): Observable<Requestline>{
    return this.http.delete(`${this.baseurl}/${requestline.id}`) as Observable<Requestline>;
  }
  detail(id: number): Observable<Requestline>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Requestline>;
  }
  edit(requestline: Requestline): Observable<any>{
    return this.http.put(`${this.baseurl}/${requestline.id}`, requestline) as Observable<any>;
  }
  list(): Observable<Requestline[]>{
    return this.http.get(`${this.baseurl}`) as Observable<Requestline[]>;
  }

}
