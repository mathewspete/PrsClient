import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class VendorListComponent implements OnInit {
  
  vendors: Vendor[] = [];

  searchCriteria: string = "";

  constructor(
    private service: VendorService,

  ) { }

  ngOnInit(): void {
    this.service.list()
      .subscribe(
        res => {
          console.log("Vendors:", res);
          this.vendors = res as Vendor[];
        },
        err => {
          console.error(err)
        }
      );
  }
}
