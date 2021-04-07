import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { Requestline } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RequestlineDetailComponent implements OnInit {

  requestline: Requestline = null;
  id: number = 0;
  showVerify: boolean = false;
  vendors: Vendor[];
  
  constructor(
    private service: RequestlineService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  edit(): void{
    this.router.navigateByUrl(`/requestline/edit/${this.id}`)
  }

  delete(): void {
    this.service.delete(this.requestline).subscribe(
      res => {
        console.warn(`Requestline ${this.requestline.id} was deleted`);
        this.router.navigateByUrl('/requestline/list');
      },
      err => {
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.service.detail(+this.id).subscribe(
      res => {
        console.log("Requestline:", res);
        this.requestline = res;
      },
      err => {
        console.error(err);
      }
    )
  }

}