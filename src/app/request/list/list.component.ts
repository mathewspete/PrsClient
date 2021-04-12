import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/system.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RequestListComponent implements OnInit {

  requests: Request[] = [];

  searchCriteria: string = "";
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private service: RequestService,
  ) { }

  //  injectVendorName(requests: Request[]){
  //    for(let p of requests) {
  //      p.vendorName = p.vendor.name;
  //    }
  //  }

  isApproved(request: Request): boolean {
    return (request.status == "APPROVE");
  }

  isOwner(request: Request): boolean {
    if (this.syssvc.loggedInUser == null) {
      return false;
    } else {
      return (request.userId == this.syssvc.loggedInUser.id);
    }

  }

  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }


  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
    this.service.list()
      .subscribe(
        res => {
          this.waiting = !this.waiting;
          console.log("Requests:", res);
          this.requests = res as Request[];
        },
        err => {
          this.waiting = !this.waiting;
          console.error(err)
        }
      );
  }
}
