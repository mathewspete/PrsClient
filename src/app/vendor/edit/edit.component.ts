import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private vendorsvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  edit(): void {
    console.log("Before Change", this.vendor);
    this.vendorsvc.edit(this.vendor).subscribe(
      res => {
        console.warn(`Successfully edited ${this.vendor.code}`); 
        this.router.navigateByUrl('/vendor/list');
      },
      err => {
        console.error(err);
      }
    )  
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.vendorsvc.detail(+this.id).subscribe(
      res => {
        console.log("Vendor:", res);
        this.vendor = res;
      },
      err => {
        console.error(err);
      }
    )
  }
}
