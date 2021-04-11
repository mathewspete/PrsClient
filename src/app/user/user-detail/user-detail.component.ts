import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User = null;
  id: number = 0;
  showVerify: boolean = false;
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  edit(): void {
    this.router.navigateByUrl(`/user/edit/${this.id}`)
  }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }
  delete(): void {
    this.waiting = !this.waiting;
    this.service.delete(this.user).subscribe(
      res => {
        this.waiting = !this.waiting;
        console.warn(`User ${this.user.lastname}, ${this.user.firstname} was deleted`);
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
    this.service.detail(+this.id).subscribe(
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
