import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Requestline } from 'src/app/requestline/requestline.class';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request();
  requestlines: Requestline[];
  users: User[];

  constructor(
    private requestsvc: RequestService,
    private requestlinesvc: RequestlineService,
    private usersvc: UserService,
    private router: Router
  ) { }

  save(): void {
    console.log("Before Create:", this.request);
    this.requestlinesvc.list().subscribe(
      res => {
        console.log("Requestlines:", res);
        this.requestlines = res as Requestline[];
      },
      err => {
        console.error(err)
      }
    );
    
    this.requestsvc.create(this.request).subscribe(
      res => {
        console.log(`Created Successfully`);
        this.router.navigateByUrl("/request/list");
      },
      err => {
        console.warn(err)
      }
    )
  }

  ngOnInit(): void {
    this.requestlinesvc.list().subscribe(
      res => {
        console.log("Requestlines:", res);
        this.requestlines = res as Requestline[];
      },
      err => {
        err
      }
    );
    this.usersvc.list().subscribe(
      res => {
        console.log("Requestlines:", res);
        this.users = res as User[];
      },
      err => {
        err
      }
    );

  }

}
