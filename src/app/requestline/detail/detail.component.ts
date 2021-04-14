import { SystemService } from './../../system.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { Request } from 'src/app/request/request.class';
import { RequestService } from 'src/app/request/request.service';
import { Requestline } from '../requestline.class';
import { RequestlineService } from '../requestline.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requestline-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RequestlineDetailComponent implements OnInit {

  @Input() productId: number;

  requestline: Requestline = new Requestline();
  products: Product[];
  request: Request;
  requestId: number;
  waiting: boolean = false;
  ownerId: number;
  closeResult: string = '';


  constructor(
    private syssvc: SystemService,
    private requestsvc: RequestService,
    private requestlinesvc: RequestlineService,
    private productsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) { }

  passRl(id: number) {
    this.requestId = id;
  }




  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }
  isOwner(): boolean {
    return this.syssvc.loggedInUser.id === this.ownerId;
  }

  updatePrice(): void {
    this.requestline.productId = +this.requestline.product.id;
  }

  save(productId: number): void {
    this.requestline.productId = this.requestlinesvc.getProductId();
    this.requestline.requestId = this.requestId;
    console.log("Before Create:", this.requestline);
    this.requestlinesvc.create(this.requestline).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log(`Created Successfully`);
        this.router.navigateByUrl(`/request/line/${this.requestline.requestId}`);
      },
      err => {
        this.waiting = !this.waiting;
        console.warn(err)
      }
    )
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();

    this.requestId = this.requestlinesvc.getRequestId();
    console.log("reqId:", this.requestId);
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
    this.requestsvc.detail(this.requestId).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Request:", res);
        this.request = res;
        //        this.ownerId = this.request.userId;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }

}
