import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemService } from '../system.service';
import { Requestline } from './requestline.class';

@Injectable({
  providedIn: 'root'
})
export class RequestlineService {

  baseurl: string = `${this.syssvc.domain}/api/Requestlines`;
  requestID: number;
  pid: number;

  shhh: boolean = true;

  shhhToggle(): void {
    console.log("shhh");
    this.shhh = !this.shhh
  }

  getShhh(): boolean {
    return this.shhh;
  }

  constructor(
    private syssvc: SystemService,
    private http: HttpClient
  ) { }

  create(requestline: Requestline): Observable<Requestline> {
    return this.http.post(`${this.baseurl}`, requestline) as Observable<Requestline>;
  }
  delete(requestline: Requestline): Observable<Requestline> {
    return this.http.delete(`${this.baseurl}/${requestline.id}`) as Observable<Requestline>;
  }
  detail(id: number): Observable<Requestline> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Requestline>;
  }
  edit(requestline: Requestline): Observable<any> {
    return this.http.put(`${this.baseurl}/${requestline.id}`, requestline) as Observable<any>;
  }
  list(): Observable<Requestline[]> {
    return this.http.get(`${this.baseurl}`) as Observable<Requestline[]>;
  }


  passRl(id: number) {
    this.requestID = id;
  }

  setRlPid(pid: number): void {
    console.log("pid:", pid, "rid:", this.requestID);
    this.pid = pid;
  }

  getProductId() {
    return this.pid;
  }
  getRequestId() {
    return this.requestID;
  }



}
