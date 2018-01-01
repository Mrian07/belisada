import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})

export class ModalPopupComponent implements OnInit {
  alert: any;
  constructor() { }

  ngOnInit() {
  }

}
