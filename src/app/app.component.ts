// import { Component } from '@angular/core';
import {Component, NgModule, Injectable, Inject, ViewChild, OnInit} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import { Globals } from '@belisada/core/services';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <div class="loading" *ngIf="globals.isLoading === true"></div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public globals: Globals, titleService: Title, router: Router, activatedRoute: ActivatedRoute) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(router.routerState, router.routerState.root).join('-');
        console.log('title', title);
        titleService.setTitle(title);
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
