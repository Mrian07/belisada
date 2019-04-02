import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  template: `
    <bs-main-layout>
      <router-outlet></router-outlet>
    </bs-main-layout>`
})
export class EventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
