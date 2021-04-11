import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = null;
  id: number = 0;
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private usersvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }

  isOwner(): boolean {
    console.log("isOwner:", this.syssvc.loggedInUser.id, this.id);
    console.log(this.syssvc.loggedInUser.id == this.id);
    return (this.syssvc.loggedInUser.id == this.id);
  }

  edit(): void {
    this.waiting = !this.waiting;
    console.log("Before Change", this.user);
    this.usersvc.edit(this.user).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`Successfully edited ${this.user.username}`);
        this.router.navigateByUrl('/user/list');
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
    this.usersvc.detail(+this.id).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.log("User:", res);
        this.user = res;
      },
      err => {
        this.waiting = !this.waiting;
        console.error(err);
      }
    )
  }
}
