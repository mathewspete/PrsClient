/*
// tslint:disable: variable-name
import { Component, HostBinding, OnInit } from '@angular/core';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-hero-list-page',
  templateUrl: 'hero-list-page.component.html',
  styleUrls: ['hero-list-page.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero, form', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})

export class HeroListPageComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  heroTotal = -1;
  get heroes() { return this._heroes; }
  private _heroes = [];

  ngOnInit() {

  }

  updateCriteria(criteria: string) {

  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

/*
import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
    return trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ]);
}

export function flyInOut() {
    return trigger('flyInOut',[
        state('*', style({ opacity: 1, transform: 'translateX(0)'})),
        transition(':enter', [
            style({ transform: 'translateX(-100%)', opacity:0 }),
            animate('500ms ease-in')
        ]),
        transition(':leave', [
            animate('500ms ease-out', style({ transform: 'translateX(100%)', opacity: 0}))
        ])
    ]);
}
export function expand() {
    return trigger('expand', [
        state('*', style({ opacity: 1, transform: 'translateX(0)' })),
        transition(':enter', [
            style({ transform: 'translateY(-50%)', opacity:0 }),
            animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
    ]);
}
*/