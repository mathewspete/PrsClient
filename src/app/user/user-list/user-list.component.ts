import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  searchCriteria: string = "";
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private service: UserService

  ) { }

  isAdmin() {
    return this.syssvc.isAdmin();
  }

  isOwner(U: User) {
    if (this.syssvc.loggedInUser == null) {
      return false;
    } else {
      return (U.id == this.syssvc.loggedInUser.id);
    }
  }

  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
    this.service.list()
      .subscribe(
        res => {
          this.waiting = !this.waiting;
          console.log("Users:", res);
          this.users = res as User[];
        },
        err => {
          this.waiting = !this.waiting;
          console.error(err)
        }
      );
  }
}
