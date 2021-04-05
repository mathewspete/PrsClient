import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: any[] =[
    {display: 'Home', route: '/home' },
    {display: 'About', route: '/about' },
    {display: 'Users', route: '/user/list' },
    {display: 'Vendors', route: '/vendor/list' },
    {display: 'Help', route: '/help' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
