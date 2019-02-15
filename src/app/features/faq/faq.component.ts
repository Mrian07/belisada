import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleFaq() {
    const faqContent = document.getElementById('faqContent');
    if (faqContent.style.display === 'none') {
      faqContent.style.display = 'block';
    } else {
      faqContent.style.display = 'none';
    }
  }

  toggleRegis() {
    const regisContent = document.getElementById('regisContent');
    if (regisContent.style.display === 'none') {
      regisContent.style.display = 'block';
    } else {
      regisContent.style.display = 'none';
    }
  }

  toggleSeller() {
    const sellerContent = document.getElementById('sellerContent');
    if (sellerContent.style.display === 'none') {
      sellerContent.style.display = 'block';
    } else {
      sellerContent.style.display = 'none';
    }
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.body.scrollIntoView({behavior: 'smooth'});
  }

  regButton() {
    const regis = document.getElementById('registrasi');
    regis.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  faqButton() {
    const faq = document.getElementById('faq');
    faq.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  sellerButton() {
    const seller = document.getElementById('seller');
    seller.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

}
