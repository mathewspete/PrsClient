import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/system.service';
import { Requestline } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RequestlineListComponent implements OnInit {

  requestlines: Requestline[] = [];
  searchCriteria: string = "";
  waiting: boolean = false;


  constructor(
    private syssvc: SystemService,
    private service: RequestlineService
  ) { }

  //  injectVendorName(requestlines: Requestline[]){
  //    for(let p of requestlines) {
  //      p.vendorName = p.vendor.name;
  //    }
  //  }



  ngOnInit(): void {
    this.syssvc.verifyLogin();
    this.service.list()
      .subscribe(
        res => {
          this.waiting = !this.waiting;
          console.log("Requestlines:", res);
          this.requestlines = res as Requestline[];
        },
        err => {
          this.waiting = !this.waiting;
          console.error(err)
        }
      );
  }
}
