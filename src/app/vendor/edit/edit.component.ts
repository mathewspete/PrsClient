import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendor: Vendor = null;
  id: number = 0;
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private vendorsvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  edit(): void {
    this.waiting = !this.waiting;
    console.log("Before Change", this.vendor);
    this.vendorsvc.edit(this.vendor).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Successfully edited ${this.vendor.code}`);
        this.router.navigateByUrl('/vendor/list');
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
    this.waiting = !this.waiting;
    this.id = this.route.snapshot.params.id;
    this.vendorsvc.detail(+this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Vendor:", res);
        this.vendor = res;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }
}
