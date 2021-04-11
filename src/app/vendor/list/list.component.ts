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

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }
  isUser: boolean = false;
  waiting: boolean = false;


  constructor(
    private service: VendorService,
    private syssvc: SystemService

  ) { }

  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
    this.service.list()
      .subscribe(
        res => {
          this.waiting = !this.waiting;
          console.log("Vendors:", res);
          this.vendors = res as Vendor[];
        },
        err => {
          this.waiting = !this.waiting;
          console.error(err)
        }
      );
  }
}
