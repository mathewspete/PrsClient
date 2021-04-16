import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SystemService } from '../system.service';
import { Requestline } from './requestline.class';

@Injectable({
  providedIn: 'root'
})
export class LineitemsService {

  baseurl: string = `${this.syssvc.domain}/api/Requestlines`;
  requestID: number;

  constructor(
    private syssvc: SystemService,
    private http: HttpClient
  ) { }


  followedList: Requestline[];

  private subjectName = new Subject<Requestline[]>();

  passValue(rid) {
    this.getByRequestID(rid).subscribe(
      res => {
        console.log("Requestlines from requestline/request:", res);
        this.followedList = res as Requestline[];
      },
      err => {
        err
      }
    );
    this.subjectName.next(this.followedList);
  }

  getUpdate(): Observable<any> { //the receiver component calls this function
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }


  getByRequestID(rid: number): Observable<Requestline[]> {
    this.requestID = rid;
    return this.http.get(`${this.baseurl}/request/${rid}`) as Observable<Requestline[]>;
  }


}
