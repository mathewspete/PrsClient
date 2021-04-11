import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = new User();
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private usersvc: UserService,
    private router: Router
  ) { }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }

  save(): void {
    this.waiting = !this.waiting;
    console.log("Before Create:", this.user);
    this.usersvc.create(this.user).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log(`Created Successfully`);
        this.router.navigateByUrl("/user/list");
      },
      err => {
        this.waiting = !this.waiting;
        console.warn(err)
      }
    )
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();
  }

}
