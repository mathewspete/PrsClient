import { Request } from './../request/request.class';
import { RequestService } from './../request/request.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../system.service';
import { User } from '../user/user.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: any[] = [
    { display: 'Home', route: '/home', icon: 'home' },
    { display: 'About', route: '/about', icon: 'info' },
    { display: 'Users', route: '/user/list', icon: 'account_circle' },
    { display: 'Vendors', route: '/vendor/list', icon: 'store' },
    { display: 'Products', route: '/product/list', icon: 'inventory' },
    { display: 'Requests', route: '/request/list', icon: 'description' },
    { display: 'Pending', route: '/request/review', icon: 'rule' },
  ];

  currentUser: User = this.syssvc.loggedInUser;
  showLogout: boolean = false;
  loggedInAs: string;
  notify: number;
  pendingCt: number;
  requests: Request[];

  constructor(
    private syssvc: SystemService,
    private requestsvc: RequestService,
    private router: Router
  ) { }

  loginPage() {
    if (this.router.url != "/login") {
      this.syssvc.returnUrl = this.router.url;
      this.router.navigateByUrl("/login");
    }
  }

  logout() {
    this.syssvc.logout();
    return this.router.navigateByUrl("/home");
    this.loggedInAs = null;
  }

  needsReview(): boolean { 
    return (this.syssvc.isReviewer() && (this.pendingCt > 0));
  }

  ngOnInit(): void {
    if (this.syssvc.loggedInUser != null) {
      this.showLogout = this.syssvc.isLoggedIn();
      this.loggedInAs = this.syssvc.loggedInUser.firstname;
      this.requestsvc.nonUser(this.syssvc.loggedInUser)
        .subscribe(
          res => {
            console.log("Requests:", res);
            this.requests = res as Request[];
            this.pendingCt = this.requests.length;
          },
          err => {
            console.error(err)
            this.pendingCt - 1;
          }
        );
      console.log("pendingCt:", this.pendingCt);
    }



  }

}

