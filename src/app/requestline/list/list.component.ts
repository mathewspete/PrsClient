import { Component, OnInit } from '@angular/core';
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

  constructor(
    private service: RequestlineService,

  ) { }

//  injectVendorName(requestlines: Requestline[]){
//    for(let p of requestlines) {
//      p.vendorName = p.vendor.name;
//    }
//  }



  ngOnInit(): void {
    
    this.service.list()
      .subscribe(
        res => {
          console.log("Requestlines:", res);
          this.requestlines = res as Requestline[];
        },
        err => {
          console.error(err)
        }
      );
  }
}
