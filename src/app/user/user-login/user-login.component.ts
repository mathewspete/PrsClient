import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user: User = new User();
  id: number = 0;
  sysUser: User;
  status: boolean = true;
  waiting: boolean = false;


  constructor(
    private sys: SystemService,
    private usersvc: UserService,
    private router: Router
  ) { }

  reset(): void {
    this.status = true;
  }

  login(): void {
    this.waiting = !this.waiting;
    console.log("Before login:", this.user);
    this.usersvc.login(this.user.username, this.user.password).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("User:", res, "is logged in");
        this.sys.loggedInUser = res;

        //console.log("loggedInUser:", sys.loggedInUser);
        this.router.navigateByUrl(this.sys.returnUrl);
      },
      err => {
        this.waiting = !this.waiting;
        this.status = false;
        console.error(err);
      }
    );
  }
  ngOnInit(): void {
  }
}
