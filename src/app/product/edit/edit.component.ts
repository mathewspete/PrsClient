import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = null;
  id: number = 0;
  vendors: Vendor[];
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private productsvc: ProductService,
    private vendorsvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  edit(): void {
    console.log("Before Change", this.product);
    this.productsvc.edit(this.product).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Successfully edited ${this.product.partNbr}, ${this.product.partNbr}`);
        this.router.navigateByUrl('/product/list');
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();

    this.id = this.route.snapshot.params.id;
    this.vendorsvc.list().subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Vendors:", res);
        this.vendors = res as Vendor[];
      },
      err => {
        this.waiting = !this.waiting;
        err
      }
    );
    this.productsvc.detail(+this.id).subscribe(
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
