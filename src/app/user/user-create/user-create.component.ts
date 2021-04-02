import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = new User();

  constructor(
    private usersvc: UserService,
    private router: Router
  ) { }

  save(): void {
    console.log("Before Create:", this.user);
    this.usersvc.create(this.user).subscribe(
      res => {
        console.log(`Created Successfully`);
        this.router.navigateByUrl("/user/list");
      },
      err => {
        console.warn(err)
      }
    )
  }

  ngOnInit(): void {
  }

}
