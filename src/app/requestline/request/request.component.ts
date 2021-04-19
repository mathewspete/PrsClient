import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requestline } from 'src/app/requestline/requestline.class';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { User } from 'src/app/user/user.class';

import { SystemService } from 'src/app/system.service';
import { RequestService } from 'src/app/request/request.service';
import { Request } from 'src/app/request/request.class';
import { Subscription } from 'rxjs';
import { LineitemsService } from '../lineitems.service';

@Component({
  selector: 'app-requested',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  mySubjectRLs: Requestline[];

  private subscriptionName: Subscription;

  constructor(
    private syssvc: SystemService,
    private requestsvc: RequestService,
    private lineitemsvc: LineitemsService,
    private requestlinesvc: RequestlineService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscriptionName = this.lineitemsvc.getUpdate().subscribe
      (message => { //message contains the data sent from service
        this.requestlines = message;
      });
  }

  request: Request = null;
  requestlines: Requestline[];
  id: number = 0;
  showVerify: boolean = false;
  users: User[];
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

  isApproved(): boolean {
    return this.request.status === "APPROVED";
  }

  isAdmin(): boolean {
    console.log("isAdmin", this.syssvc.isAdmin());
    return this.syssvc.isAdmin();
  }

  isReviewer(): boolean {
    console.log("isAdmin", this.syssvc.isReviewer());
    return this.syssvc.isReviewer();
  }




  deleteline(rl: Requestline): void {
    this.waitingRl = !this.waitingRl;
    this.requestlinesvc.delete(rl).subscribe(
      res => {
        console.warn(`Requestline ${rl.id} was deleted`);
        this.requestlinesvc.getByRequestID(+this.id).subscribe(
          res => {
            this.waitingRl = !this.waitingRl;
            console.log("Requestlines after delete:", res);
            this.requestlines = res;
          },
          err => {
            this.waitingRl = !this.waitingRl;
            console.error(err);
          }
        )
        //this.router.navigateByUrl(`/request/list`);
        //this.router.navigateByUrl(`/request/line/${this.request.id}`);
      },
      err => {
        this.waitingRl = !this.waitingRl;
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    this.waitingRl = !this.waitingRl;
    this.id = +this.route.snapshot.params.id;
    this.requestlinesvc.getByRequestID(this.id).subscribe(
      res => {
        this.waitingRl = !this.waitingRl;
        console.log("Requestlines from requestline/request:", res);
        this.requestlines = res as Requestline[];
      },
      err => {
        this.waitingRl = !this.waitingRl;
        err
      }
    );
    this.waiting = !this.waiting;
    this.requestsvc.detail(this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Requestlines from requestline/request:", res);
        this.request = res as Request;
        this.isOwner = (this.syssvc.loggedInUser.id === this.request.userId);
        console.log("loggedInUser:", this.syssvc.loggedInUser.username, "isOwner:", this.isOwner);
      },
      err => {
        this.waiting = !this.waiting;
        err
      }
    );
  }

  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscriptionName.unsubscribe();
  }

}
