import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-footer',
  templateUrl: './front-footer.component.html',
  styleUrls: ['./front-footer.component.scss']
})
export class FrontFooterComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    
  }

  agree() {
    const el = document.getElementById('agreement');
    el.style.display = el.style.display == 'none' || el.style.display == '' ? 'block' : 'none';
  }

  btnTop() {
  }
}
