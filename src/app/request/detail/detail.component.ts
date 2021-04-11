import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { User } from 'src/app/user/user.class';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request: Request = null;
  id: number = 0;
  showVerify: boolean = false;
  users: User[];
  waiting: boolean = false;
  isAdmin: boolean = false;
  isOwner: boolean = false;

  constructor(
    private syssvc: SystemService,
    private service: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  edit(): void {
    this.router.navigateByUrl(`/request/edit/${this.id}`)
  }



  delete(): void {
    this.service.delete(this.request).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Request ${this.request.id} was deleted`);
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
    this.id = this.route.snapshot.params.id;
    this.service.detail(+this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Request:", res);
        this.request = res;
        this.isAdmin = this.syssvc.isAdmin();
        this.isOwner = this.syssvc.loggedInUser.id === this.request.userId;
        console.log("isAdmin:", this.isAdmin);
        console.log("Owner:", this.isOwner);
        console.log("this.syssvc.loggedInUser.id:", this.syssvc.loggedInUser.id);
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }
}
