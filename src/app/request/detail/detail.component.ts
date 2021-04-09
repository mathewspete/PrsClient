import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { User } from 'src/app/user/user.class';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request: Request = null;
  id: number = 0;
  showVerify: boolean = false;
  users: User[];

  constructor(
    private syssvc: SystemService,
    private service: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  edit(): void {
    this.router.navigateByUrl(`/request/edit/${this.id}`)
  }

  delete(): void {
    this.service.delete(this.request).subscribe(
      res => {
        console.warn(`Request ${this.request.id} was deleted`);
        this.router.navigateByUrl('/request/list');
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
        console.log("Request:", res);
        this.request = res;
      },
      err => {
        console.error(err);
      }
    )
  }

}
