import { SystemService } from 'src/app/system.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { Requestline } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RequestlineDetailComponent implements OnInit {

  requestline: Requestline = null;
  id: number = 0;
  showVerify: boolean = false;
  vendors: Vendor[];
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private service: RequestlineService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }



  edit(): void {
    this.router.navigateByUrl(`/requestline/edit/${this.id}`)
  }

  delete(): void {
    this.waiting = !this.waiting;
    this.service.delete(this.requestline).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Requestline ${this.requestline.id} was deleted`);
        this.router.navigateByUrl('/requestline/list');
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    this.waiting = !this.waiting;
    this.syssvc.verifyLogin();
    this.id = this.route.snapshot.params.id;
    this.service.detail(+this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Requestline:", res);
        this.requestline = res;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }

}
