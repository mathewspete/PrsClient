import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  edit(): void{
    this.router.navigateByUrl(`/user/edit/${this.id}`)
  }

  delete(): void {
    this.service.delete(this.user).subscribe(
      res => {
        console.warn(`User ${this.user.lastname}, ${this.user.firstname} was deleted`);
        this.router.navigateByUrl('/user/list');
      },
      err => {
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.service.detail(+this.id).subscribe(
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