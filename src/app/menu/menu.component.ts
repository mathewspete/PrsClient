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

  menus: any[] =[
    {display: 'Home', route: '/home', icon: 'home'},
    {display: 'About', route: '/about', icon: 'info'},
    {display: 'Users', route: '/user/list', icon: 'account_circle'},
    {display: 'Vendors', route: '/vendor/list', icon: 'store'},
    {display: 'Products', route: '/product/list', icon: 'inventory'},
    {display: 'Requests', route: '/request/list', icon: 'description'},
    {display: 'Pending', route: '/request/review', icon: 'rule'},
    {display: 'Help', route: '/help', icon: 'help'}
  ];

  currentUser: User = this.syssvc.loggedInUser;
  showLogout: boolean = false;

  constructor(
    private syssvc: SystemService,
    private router: Router
  ) { }

  logout() {
    this.syssvc.logout();
    return this.router.navigateByUrl("/home");
  }

  ngOnInit(): void {
    if (this.syssvc.loggedInUser != null) {
      this.showLogout = this.syssvc.isLoggedIn();
    }
    
  }

}
