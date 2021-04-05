import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendor: Vendor = null;
  id: number = 0;
  showVerify: boolean = false;
  
  constructor(
    private service: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  edit(): void{
    this.router.navigateByUrl(`/vendor/edit/${this.id}`)
  }

  delete(): void {
    this.service.delete(this.vendor).subscribe(
      res => {
        console.warn(`Vendor ${this.vendor.code}, ${this.vendor.name} was deleted`);
        this.router.navigateByUrl('/vendor/list');
      },
      err => {
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.service.detail(+this.id).subscribe(
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