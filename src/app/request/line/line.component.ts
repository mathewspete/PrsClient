import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requestline } from 'src/app/requestline/requestline.class';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { User } from 'src/app/user/user.class';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { SystemService } from 'src/app/system.service';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class RequestLineComponent implements OnInit {

  request: Request = null;
  requestlines: Requestline[];
  id: number = 0;
  showVerify: boolean = false;
  users: User[];
  isAdmin: boolean = false;
  isReviewer: boolean = false;
  isOwner: boolean = false;
  waiting: boolean = false;
  waitingRl: boolean = false;
  shhh: boolean = this.requestlinesvc.shhh;

  toggleShhh(): void {
    this.requestlinesvc.passRl(+this.request.id);
    this.requestlinesvc.shhhToggle();
  }

  getShhh(): boolean {
    return this.requestlinesvc.getShhh();
  }


  constructor(
    private syssvc: SystemService,
    private service: RequestService,
    private productsvc: ProductService,
    private requestlinesvc: RequestlineService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  isApproved(): boolean {
    return this.request.status === "APPROVE";
  }

  deleteline(rl: Requestline): void {
    this.waitingRl = !this.waitingRl;
    this.requestlinesvc.delete(rl).subscribe(
      res => {
        this.waitingRl = !this.waitingRl;
        console.warn(`Requestline ${rl.id} was deleted`);
        location.reload();
        //this.router.navigateByUrl(`/request/list`);
        //this.router.navigateByUrl(`/request/line/${this.request.id}`);
      },
      err => {
        this.waitingRl = !this.waitingRl;
        console.error(err);
      }
    )
  }




  review(): void {
    this.waiting = !this.waiting;
    this.request.rejectionReason = "";
    console.log("Request pre review:", this.request);
    this.service.review(this.request).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Request #${this.request.id} review`);
        console.warn(`Request review:`, this.request);
        this.router.navigateByUrl('/request/list');
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )

  }

  approve(): void {
    this.waiting = !this.waiting;
    console.log("Request pre approve:", this.request);
    this.service.approve(this.request).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log(`Request #${this.request.id} approve`);
        this.router.navigateByUrl('/request/list');
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }

  reject(): void {
    this.waiting = !this.waiting;
    console.log("Request pre reject:", this.request);
    this.service.reject(this.request).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Request #${this.request.id} rejected`);
        this.router.navigateByUrl('/request/list');
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
    this.waitingRl = !this.waitingRl;
    // this.syssvc.loggedInUser
    this.id = this.route.snapshot.params.id;
    this.requestlinesvc.list().subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Requestlines:", res);
        this.requestlines = res as Requestline[];
      },
      err => {
        this.waiting = !this.waiting;
        err
      }
    );
    this.service.detail(+this.id).subscribe(
      res => {
        this.waitingRl = !this.waitingRl;
        console.log("Request:", res);
        this.request = res;
        this.isOwner = (this.syssvc.loggedInUser.id === this.request.userId);
        this.isAdmin = this.syssvc.isAdmin();
        this.isReviewer = this.syssvc.isReviewer();
      },
      err => {
        this.waitingRl = !this.waitingRl;
        console.error(err);
      }
    )
  }

}
