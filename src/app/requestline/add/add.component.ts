import { SystemService } from './../../system.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { Requestline } from 'src/app/requestline/requestline.class';
import { Request } from 'src/app/request/request.class';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { RequestService } from 'src/app/request/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-requestline-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.product, form', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class RequestlineAddComponent implements OnInit {

  products: Product[] = [];
  requestline: Requestline = null;
  id: number = 0;
  request: Request;
  displayPrice: number;
  searchCriteria: string = "";
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

  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
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
    );
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
