import { Component, OnInit } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product[] = [];

  searchCriteria: string = "";

  constructor(
    private service: ProductService,

  ) { }

//  injectVendorName(products: Product[]){
//    for(let p of products) {
//      p.vendorName = p.vendor.name;
//    }
//  }



  ngOnInit(): void {
    this.service.list()
      .subscribe(
        res => {
          console.log("Products:", res);
          this.products = res as Product[];
        },
        err => {
          console.error(err)
        }
      );
  }
}
