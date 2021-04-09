import { SystemService } from './../../system.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  requestId: number;

  constructor(
    private syssvc: SystemService,
    private requestlinesvc: RequestlineService,
    private productsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    this.requestline.requestId = this.requestId;
    console.log("Before Create:", this.requestline);
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
    this.requestId = +this.route.snapshot.params.rid;
    console.log("reqId:", this.requestId);
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
