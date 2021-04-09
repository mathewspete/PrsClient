import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemService } from '../system.service';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseurl: string = `${this.syssvc.domain}/api/Products`

  constructor(
    private syssvc: SystemService,
    private http: HttpClient
  ) { }

  create(product: Product): Observable<Product>{
    return this.http.post(`${this.baseurl}`, product) as Observable<Product>;
  }
  delete(product: Product): Observable<Product>{
    return this.http.delete(`${this.baseurl}/${product.id}`) as Observable<Product>;
  }
  detail(id: number): Observable<Product>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Product>;
  }
  edit(product: Product): Observable<any>{
    return this.http.put(`${this.baseurl}/${product.id}`, product) as Observable<any>;
  }
  list(): Observable<Product[]>{
    return this.http.get(`${this.baseurl}`) as Observable<Product[]>;
  }

}
