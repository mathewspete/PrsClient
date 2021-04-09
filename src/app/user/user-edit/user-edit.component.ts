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

  constructor(
    private syssvc: SystemService,
    private usersvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  edit(): void {
    console.log("Before Change", this.user);
    this.usersvc.edit(this.user).subscribe(
      res => {
        console.warn(`Successfully edited ${this.user.username}`);
        this.router.navigateByUrl('/user/list');
      },
      err => {
        console.error(err);
      }
    )
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.usersvc.detail(+this.id).subscribe(
      res => {
        console.log("User:", res);
        this.user = res;
      },
      err => {
        console.error(err);
      }
    )
  }
}
