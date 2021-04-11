import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
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
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private service: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  edit(): void {
    this.router.navigateByUrl(`/vendor/edit/${this.id}`)
  }

  delete(): void {
    this.service.delete(this.vendor).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Vendor ${this.vendor.code}, ${this.vendor.name} was deleted`);
        this.router.navigateByUrl('/vendor/list');
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();

    this.id = this.route.snapshot.params.id;
    this.service.detail(+this.id).subscribe(
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
