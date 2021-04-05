import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private productsvc: ProductService,
    private vendorsvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  edit(): void {
    console.log("Before Change", this.product);
    this.productsvc.edit(this.product).subscribe(
      res => {
        console.warn(`Successfully edited ${this.product.partNbr}, ${this.product.partNbr}`); 
        this.router.navigateByUrl('/product/list');
      },
      err => {
        console.error(err);
      }
    )  
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.vendorsvc.list().subscribe(
      res => {
        console.log("Vendors:", res);
        this.vendors = res as Vendor[];
      },
      err => {
        err
      }
    );
    this.productsvc.detail(+this.id).subscribe(
      res => {
        console.log("Product:", res);
        this.product = res;
      },
      err => {
        console.error(err);
      }
    )
  }
}
