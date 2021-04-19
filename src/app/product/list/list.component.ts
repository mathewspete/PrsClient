import { ActivatedRoute, Router } from '@angular/router';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { SystemService } from './../../system.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { RequestlineDetailComponent } from 'src/app/requestline/detail/detail.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  searchCriteria: string = "";
  waiting: boolean = false;
  requestlineInfo: number;
  rid: number;
  page: string;

  constructor(
    private syssvc: SystemService,
    private service: ProductService,
    private requestlinesvc: RequestlineService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //this.modalService.activeInstances.subscribe((list) => {
    //    this.modalsNumber = list.length;
    //});
  }

  //  injectVendorName(products: Product[]){
  //    for(let p of products) {
  //      p.vendorName = p.vendor.name;
  //    }
  //  }

  isAdmin(): boolean {
    console.log("isAdmin", this.syssvc.isAdmin());
    return this.syssvc.isAdmin();
  }

  getShhh(): boolean {
    return this.requestlinesvc.getShhh();
  }

  setRlPid(pid: number): void {
    this.requestlinesvc.setRlPid(pid);
    this.requestlineInfo = pid;
  }

  isListPage(): boolean {
    return (this.page === '/product/list');
  }

  ngOnInit(): void {
    this.rid = this.route.snapshot.params.id;
    this.syssvc.verifyLogin();
    this.page = this.router.url;
    console.log("url:", this.page);
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

  open(pid: number) {
    if (!this.isListPage()) {
      this.requestlinesvc.setRlPid(pid);
      const modalRef = this.modalService.open(RequestlineDetailComponent);
      modalRef.componentInstance.productId = pid;
    }
  }

}

