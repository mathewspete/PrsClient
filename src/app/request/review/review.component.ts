import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/system.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class RequestReviewComponent implements OnInit {

  requests: Request[] = [];

  searchCriteria: string = "";
  waiting: boolean = false;


  constructor(
    private service: RequestService,
    private syssvc: SystemService
  ) { }

  //  injectVendorName(requests: Request[]){
  //    for(let p of requests) {
  //      p.vendorName = p.vendor.name;
  //    }
  //  }
  isAdmin(): boolean {
    return this.syssvc.isAdmin();
  }
  isOwner(request: Request): boolean {
    return this.syssvc.loggedInUser.id === request.userId;
  }



  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.waiting = !this.waiting;
    this.service.nonUser(this.syssvc.loggedInUser)
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
    //    this.service.pending()
    //      .subscribe(
    //        res => {
    //          console.log("Requests:", res);
    //          this.requests = res as Request[];
    //        },
    //        err => {
    //          console.error(err)
    //        }
    //      );
  }
}
