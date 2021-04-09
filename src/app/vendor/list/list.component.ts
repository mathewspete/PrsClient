import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/system.service';
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

  isAdmin: boolean = false;
  isReviewer: boolean = false;
  isUser: boolean = false;

  constructor(
    private service: VendorService,
    private syssvc: SystemService

  ) { }

  ngOnInit(): void {

    this.service.list()
      .subscribe(
        res => {
          console.log("Vendors:", res);
          this.vendors = res as Vendor[];
          this.isAdmin = this.syssvc.isAdmin();
        },
        err => {
          console.error(err)
        }
      );
  }
}
