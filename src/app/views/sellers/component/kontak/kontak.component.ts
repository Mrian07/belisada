import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActiveLink } from '../../../../core/service/shared.service';

@Component({
  selector: 'app-kontak',
  templateUrl: './kontak.component.html',
  styleUrls: ['./kontak.component.scss']
})
export class KontakComponent implements OnInit {

  constructor(private title: Title, private active: ActiveLink) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Kontak Pesan');
  }

}
