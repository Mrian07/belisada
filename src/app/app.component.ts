// import { Component } from '@angular/core';
import {Component, NgModule, Injectable, Inject, ViewChild, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    // resolved(captchaResponse: string) {
    //   console.log(`Resolved captcha with response ${captchaResponse}:`);
    // }
}
