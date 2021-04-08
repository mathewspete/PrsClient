import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
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

  constructor(
    private requestlinesvc: RequestlineService,
    private productsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  edit(): void {
    console.log("Before Change", this.requestline);
    this.requestlinesvc.edit(this.requestline).subscribe(
      res => {
        console.warn(`Successfully edited ${this.requestline.id}`); 
        this.router.navigateByUrl(`/request/line/${this.requestline.requestId}`);
      },
      err => {
        console.error(err);
      }
    )
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.productsvc.list().subscribe(
      res => {
        console.log("Products:", res);
        this.products = res as Product[];
      },
      err => {
        err
      }
    );
    this.requestlinesvc.detail(+this.id).subscribe(
      res => {
        console.log("Requestline:", res);
        this.requestline = res;
      },
      err => {
        console.error(err);
      }
    )
  }
}
