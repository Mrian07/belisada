import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-kontak',
  templateUrl: './kontak.component.html',
  styleUrls: ['./kontak.component.scss']
})
export class KontakComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Kontak Pesan');
  }

}
