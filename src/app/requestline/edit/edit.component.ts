  
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
  displayPrice: number;
  ownerID: number;
  waiting: boolean = false;



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
    return this.syssvc.loggedInUser.id === this.ownerID;
  }

  checkOwner(reqid: number): void {
    this.requestsvc.detail(reqid).subscribe(
      res => {
        console.log("Request with ID:", res);
        this.request = res;
        this.ownerID = this.request.userId;
      },
      err => {
        console.error(err);
      }
    )
  }


  updatePrice(): void {
    console.log("Before Update", this.requestline, +this.requestline.product.id);
    this.requestline.productId = +this.requestline.product.id;
    console.log("After Update", this.requestline);
  }

 
  edit(): void {
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
    this.requestlinesvc.detail(+this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Requestline:", res);
        this.requestline = res;
        this.displayPrice = this.requestline.product.price;
        this.checkOwner(this.requestline.requestId);
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    );
    /*
    this.requestsvc.detail(this.requestline.requestId).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Request with ID:", res);
        this.request = res;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
    */
  }
}
