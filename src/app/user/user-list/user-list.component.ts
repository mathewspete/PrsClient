import { Component, OnInit } from '@angular/core';
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

  constructor(
    private service: UserService,

  ) { }

  ngOnInit(): void {
    this.service.list()
      .subscribe(
        res => {
          console.log("Users:", res);
          this.users = res as User[];
        },
        err => {
          console.error(err)
        }
      );
  }
}
