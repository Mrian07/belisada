import { Component, OnInit } from '@angular/core';
import { CustomAlert } from './alert';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const a = new CustomAlert();
    a.show('This is just a test...');
  }

  tombolAlert() {
    const a = new CustomAlert();
    a.show('This is just a test...');
  }

}
