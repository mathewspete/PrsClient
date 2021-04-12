import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
private route: ActivatedRoute,
private router: Router
) { }

  goUsers(): void {
    this.router.navigateByUrl("/user/list");
  }
    
  goVendors(): void {
    this.router.navigateByUrl("/vendor/list");
  }
    
  goProducts(): void {
    this.router.navigateByUrl("/product/list");
  }
  
  goRequests(): void {
    this.router.navigateByUrl("/request/list");
  }
    
  goHPending(): void {
    this.router.navigateByUrl("/request/review");
  }
    
  goHelp(): void {
    this.router.navigateByUrl("/help");
  }
    

  ngOnInit(): void {
  }

}
