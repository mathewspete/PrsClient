import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseurl: string = "http://192.168.200.170:45456/api/Products"
  //baseurl: string = "http://localhost:39623/api/Products"




  constructor(
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
