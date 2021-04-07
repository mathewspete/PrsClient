import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { Request } from 'src/app/request/request.class';
import { RequestService } from 'src/app/request/request.service';
import { Requestline } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class RequestlineCreateComponent implements OnInit {

  requestline: Requestline = new Requestline();
  products: Product[];
  requests: Request[];

  constructor(
    private requestlinesvc: RequestlineService,
    private requestsvc: RequestService,
    private productsvc: ProductService,
    private router: Router
  ) { }

  save(): void {
    console.log("Before Create:", this.requestline);
    this.productsvc.list().subscribe(
      res => {
        console.log("Products:", res);
        this.products = res as Product[];
      },
      err => {
        console.error(err)
      }
    );
    this.requestsvc.list().subscribe(
      res => {
        console.log("Requests:", res);
        this.requests = res as Request[];
      },
      err => {
        console.error(err)
      }
    );
    
    this.requestlinesvc.create(this.requestline).subscribe(
      res => {
        console.log(`Created Successfully`);
        this.router.navigateByUrl(`/request/line/${this.requestline.requestId}`);
      },
      err => {
        console.warn(err)
      }
    )
  }

  ngOnInit(): void {
    this.requestsvc.list().subscribe(
      res => {
        console.log("Requests:", res);
        this.requests = res as Request[];
      },
      err => {
        console.error(err)
      }
    );
    this.productsvc.list().subscribe(
      res => {
        console.log("Products:", res);
        this.products = res as Product[];
      },
      err => {
        err
      }
    );
  }

}
