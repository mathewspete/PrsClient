import { Request } from 'src/app/request/request.class';
import { RequestService } from 'src/app/request/request.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { SystemService } from 'src/app/system.service';
import { Requestline } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class RequestlineEditComponent implements OnInit {



  requestline: Requestline = null;
  id: number = 0;
  products: Product[];
  request: Request;
  waiting: boolean = false;
  displayPrice: number;


  constructor(
    private syssvc: SystemService,
    private requestlinesvc: RequestlineService,
    private productsvc: ProductService,
    private requestsvc: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }

  isOwner(): boolean {
    return this.syssvc.loggedInUser.id === this.requestline.requestId;
  }

  updatePrice(): void {
    this.requestline.product.price = +this.requestline.product.price;
  }



  edit(): void {
    this.waiting = !this.waiting;
    console.log("Before Change", this.requestline);
    this.requestlinesvc.edit(this.requestline).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Successfully edited ${this.requestline.id}`);
        this.router.navigateByUrl(`/request/line/${this.requestline.requestId}`);
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }
  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
    this.id = this.route.snapshot.params.id;
    this.productsvc.list().subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Products:", res);
        this.products = res as Product[];
      },
      err => {
        this.waiting = !this.waiting;
        err
      }
    );
    this.waiting = !this.waiting;
    this.requestlinesvc.detail(+this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Requestline:", res);
        this.requestline = res;
        this.displayPrice = this.requestline.product.price;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
    this.requestsvc.detail(this.requestline.requestId).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Request:", res);
        this.request = res;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }
}
