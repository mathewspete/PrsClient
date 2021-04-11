import { SystemService } from 'src/app/system.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product();
  vendors: Vendor[];
  price: Number;
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private productsvc: ProductService,
    private vendorsvc: VendorService,
    private router: Router
  ) { }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }

  save(): void {
    this.waiting = !this.waiting;
    console.log("Before Create:", this.product);
    this.vendorsvc.list().subscribe(
      res => {
        console.log("Vendors:", res);
        this.vendors = res as Vendor[];
      },
      err => {
        console.error(err)
      }
    );

    this.productsvc.create(this.product).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log(`Created Successfully`);
        this.router.navigateByUrl("/product/list");
      },
      err => {
        this.waiting = !this.waiting;
        console.warn(err)
      }
    )
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();

    this.waiting = !this.waiting;
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

  }

}
