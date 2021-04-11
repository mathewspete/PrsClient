import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class VendorCreateComponent implements OnInit {

  vendor: Vendor = new Vendor();
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private vendorsvc: VendorService,
    private router: Router
  ) { }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }

  save(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
    console.log("Before Create:", this.vendor);
    this.vendorsvc.create(this.vendor).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log(`Created Successfully`);
        this.router.navigateByUrl("/vendor/list");
      },
      err => {
        this.waiting = !this.waiting;
        console.warn(err)
      }
    )
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();

  }

}
