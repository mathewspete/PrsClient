import { Component, OnInit } from '@angular/core';
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

  user: User = new User()
  id: number = 0;

  constructor(
    private sys: SystemService,
    private usersvc: UserService,
    private router: Router
  ) { }

  login(): void{
    console.log("Before login:", this.user);
    this.usersvc.login(this.user.username, this.user.password).subscribe(
      res => {
        console.log("User:", res, "is logged in");
        this.sys.loggedInUser = res;
      this.router.navigateByUrl("/user/list");
      },
      err => {
        console.error(err);  
      }
    );
  }
  ngOnInit(): void {
  }
}
