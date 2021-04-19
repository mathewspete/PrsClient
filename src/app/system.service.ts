import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "./user/user.class";

@Injectable({
  providedIn: 'root'
})

export class SystemService {

  /*
  public domain: string = "http://localhost:39623"
  public domain: string = "http://192.168.200.170:45456"
  */
  public domain: string = "http://localhost:5000"

  public loggedInUser: User | null = null;

  public returnUrl: string = `/home`;

  get(): User {
    return this.loggedInUser;
  }

  verifyLogin() {
    if (this.loggedInUser == null) {
      this.returnUrl = this.router.url;
      console.log("returnUrl:", this.returnUrl);
      return this.router.navigateByUrl("/login");
    }
  }

  isLoggedIn(): boolean {
    return (this.loggedInUser === null) ? false : true;
  }

  isAdmin(): boolean {
    if (this.loggedInUser == null) {
      return false;
    }
    else {
      return this.loggedInUser.isAdmin
    }
  }

  isReviewer(): boolean {
    if (this.loggedInUser == null) {
      return false;
    }
    else {
      return this.loggedInUser.isReviewer
    }
  }

  logout(): void {
    this.loggedInUser = null;
  }





  constructor(
    private router: Router
  ) { }

}
