import { Component } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MetadataService } from './util/metadata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private metaService: MetadataService
  ) { }

  ngOnInit() {
    // Change page title on navigation  based on route data
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((event) => {
      this.metaService.updateTitle(event['title']);
      this.metaService.updateOgUrl(event['ogUrl']);
      //Updating Description tag dynamically with title
      this.metaService.updateDescription(event['title'] + event['description'])
    });
  }

}
