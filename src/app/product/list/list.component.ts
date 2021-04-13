import { Router } from '@angular/router';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { Requestline } from './../../requestline/requestline.class';
import { SystemService } from './../../system.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
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
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  requestline: Requestline;
  searchCriteria: string = "";
  waiting: boolean = false;
  requestLineID: number;

  constructor(
    private syssvc: SystemService,
    private service: ProductService,
    private requestlinesvc: RequestlineService,
  ) { }

  //  injectVendorName(products: Product[]){
  //    for(let p of products) {
  //      p.vendorName = p.vendor.name;
  //    }
  //  }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }

  getShhh(): boolean {
    return this.requestlinesvc.getShhh();
  }

  setRlPid(pid: number): void {
    this.requestlinesvc.setRlPid(pid);
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
    this.service.list()
      .subscribe(
        res => {
          this.waiting = !this.waiting;
          console.log("Products:", res);
          this.products = res as Product[];
        },
        err => {
          this.waiting = !this.waiting;
          console.error(err)
        }
      );
  }
}
