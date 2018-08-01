// import { Component } from '@angular/core';
import {Component, NgModule, Injectable, Inject, ViewChild, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { Globals } from '@belisada/core/services';
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

    constructor(private globals: Globals) {

    }
    // resolved(captchaResponse: string) {
    //   console.log(`Resolved captcha with response ${captchaResponse}:`);
    // }
}
