import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "./user/user.class";

@Injectable({
  providedIn: 'root'
})

export class SystemService {
  public loggedInUser: User | null = null;

  get(): User {
    return this.loggedInUser;
  }

  verifyLogin() {
    if (this.loggedInUser == null) {
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
