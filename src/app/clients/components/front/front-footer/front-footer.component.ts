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
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $('html, body').animate({scrollTop: 0}, 1000);
          return false;
  }
}
