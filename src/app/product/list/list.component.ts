import { SystemService } from './../../system.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestlineDetailComponent } from 'src/app/requestline/detail/detail.component';
import { RequestlineService } from 'src/app/requestline/requestline.service';

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
  searchCriteria: string = "";
  waiting: boolean = false;
  requestlineInfo: number;
  rid: number;

  constructor(
    private syssvc: SystemService,
    private service: ProductService,
    private requestlinesvc: RequestlineService,
    private modalService: NgbModal,
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
    return this.syssvc.isAdmin();
  }


  setRlPid(pid: number): void {
    this.requestlinesvc.setRlPid(pid);
    this.requestlineInfo = pid;

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

  open(pid: number) {
    this.requestlinesvc.setRlPid(pid);
    const modalRef = this.modalService.open(RequestlineDetailComponent);
    modalRef.componentInstance.productId = pid;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


@Component({
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Profile update</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form>
      <div class="form-group">
        <label for="dateOfBirth">Date of birth</label>
        <input ngbAutofocus type="number">
      </div>
    </form>
    <ul>
      <li>{{requestlineInfo}}</li>
    </ul>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Save click')">Save</button>
  </div>
  `
})
export class NgbdModalContent {
  @Input() requestlineInfo: number;

  constructor(public activeModal: NgbActiveModal) { }
}

