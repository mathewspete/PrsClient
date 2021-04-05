import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from './vendor.class';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  baseurl: string = "http://localhost:39623/api/Vendors"




  constructor(
    private http: HttpClient
  ) { }

  create(vendor: Vendor): Observable<Vendor>{
    return this.http.post(`${this.baseurl}`, vendor) as Observable<Vendor>;
  }
  delete(vendor: Vendor): Observable<Vendor>{
    return this.http.delete(`${this.baseurl}/${vendor.id}`) as Observable<Vendor>;
  }
  detail(id: number): Observable<Vendor>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Vendor>;
  }
  edit(vendor: Vendor): Observable<any>{
    return this.http.put(`${this.baseurl}/${vendor.id}`, vendor) as Observable<any>;
  }
  list(): Observable<Vendor[]>{
    return this.http.get(`${this.baseurl}`) as Observable<Vendor[]>;
  }

}
