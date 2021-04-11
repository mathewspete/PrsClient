import { Pipe, PipeTransform } from '@angular/core';
import { User } from "./user/user.class";

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users: User[], searchCriteria: string): User[] {
    let selectedUsers: User[] = [];
    let admin: string = "admin";
    let reviewer: string = "reviewer";
    if (searchCriteria.length == 0) {
      return users;
    }
    for (let user of users) {
      if (
        user.id.toString().includes(searchCriteria)
        || user.username.toLowerCase().includes(searchCriteria.toLowerCase())
        || user.firstname.toLowerCase().includes(searchCriteria.toLowerCase())
        || user.lastname.toLowerCase().includes(searchCriteria.toLowerCase())
        || (user.email != null && user.email.toLowerCase().includes(searchCriteria.toLowerCase()))
        || (user.phone != null && user.phone.toLowerCase().includes(searchCriteria.toLowerCase()))
        || (user.isReviewer == true && reviewer.includes(searchCriteria.toLowerCase()))
        || (user.isAdmin == true && admin.includes(searchCriteria.toLowerCase()))
      ) {
        selectedUsers.push(user);
      }

    }

    return selectedUsers;
  }

}
