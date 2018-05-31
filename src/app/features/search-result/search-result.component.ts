import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-search-result-page',
  template: `
    <bs-main-layout>
        <router-outlet></router-outlet>
    </bs-main-layout>
  `
})
export class SearchResultComponent {

}