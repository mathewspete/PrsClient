import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class RequestEditComponent implements OnInit {

  request: Request = null;
  id: number = 0;
  users: User[];
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private requestsvc: RequestService,
    private usersvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }
  isOwner(): boolean {
    return (this.syssvc.loggedInUser.id === this.request.userId);
  }

  edit(): void {
    this.waiting = !this.waiting;
    console.log("Before Change", this.request);
    this.requestsvc.edit(this.request).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Successfully edited ${this.request.id}`);
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
    this.usersvc.list().subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Request/Edit Users:", res);
        this.users = res as User[];
      },
      err => {
        this.waiting = !this.waiting;
        err
      }
    );
    this.requestsvc.detail(+this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("Request/Edit Request:", res);
        this.request = res;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }
}
