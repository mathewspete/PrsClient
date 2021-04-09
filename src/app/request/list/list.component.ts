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

  constructor(
    private syssvc: SystemService,
    private service: RequestService,
  ) { }

  //  injectVendorName(requests: Request[]){
  //    for(let p of requests) {
  //      p.vendorName = p.vendor.name;
  //    }
  //  }



  ngOnInit(): void {
    this.service.list()
      .subscribe(
        res => {
          console.log("Requests:", res);
          this.requests = res as Request[];
        },
        err => {
          console.error(err)
        }
      );
  }
}
