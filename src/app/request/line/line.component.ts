import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requestline } from 'src/app/requestline/requestline.class';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { User } from 'src/app/user/user.class';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { SystemService } from 'src/app/system.service';

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
  admin: boolean = false;
  reviewer: boolean;
  creator: boolean = false;
  
  constructor(
    private syssvc: SystemService,
    private service: RequestService,
    private requestlinesvc: RequestlineService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  deleteline(rl: Requestline): void {
    this.requestlinesvc.delete(rl).subscribe(
      res => {
        console.warn(`Requestline ${rl.id} was deleted`);
        location.reload();
        //this.router.navigateByUrl(`/request/list`);
        //this.router.navigateByUrl(`/request/line/${this.request.id}`);
      },
      err => {
        console.error(err);
      }
    )
  }

  review(): void {
    console.log("Request pre review:", this.request);
    this.service.review(this.request).subscribe(
      res => {
        console.warn(`Request #${this.request.id} review`);
        console.warn(`Request review:`, this.request);
        this.router.navigateByUrl('/request/list');
      },
      err => {
        console.error(err);
      }
    )
    
  }

  approve(): void {
    console.log("Request pre approve:", this.request);
    this.service.approve(this.request).subscribe(
      res => {
        console.log(`Request #${this.request.id} approve`);
        this.router.navigateByUrl('/request/list');
      },
      err => {
        console.error(err);
      }
    )
  }

  reject(): void {
    console.log("Request pre reject:", this.request);
    this.service.reject(this.request).subscribe(
      res => {
        console.warn(`Request #${this.request.id} rejected`);
        this.router.navigateByUrl('/request/list');
      },
      err => {
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    // this.syssvc.loggedInUser
    this.id = this.route.snapshot.params.id;
    this.requestlinesvc.list().subscribe(
      res => {
        console.log("Requestlines:", res);
        this.requestlines = res as Requestline[];
      },
      err => {
        err
      }
    );
    this.service.detail(+this.id).subscribe(
      res => {
        console.log("Request:", res);
        this.request = res;
        this.creator = (this.syssvc.loggedInUser.id === this.request.userId);
        this.admin = this.syssvc.isAdmin();
      },
      err => {
        console.error(err);
      }
    )
  }

}