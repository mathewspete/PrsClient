import { SystemService } from 'src/app/system.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = null;
  id: number = 0;
  showVerify: boolean = false;
  vendors: Vendor[];
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  edit(): void {
    this.router.navigateByUrl(`/product/edit/${this.id}`)
  }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }

  delete(): void {
    this.waiting = !this.waiting;
    this.service.delete(this.product).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Product ${this.product.partNbr}, ${this.product.name} was deleted`);
        this.router.navigateByUrl('/product/list');
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
    this.service.detail(+this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Product:", res);
        this.product = res;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }

}
