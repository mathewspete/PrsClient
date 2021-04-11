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
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private requestlinesvc: RequestlineService,
    private productsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }
}
