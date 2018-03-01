import { Injectable, Component, OnInit, AfterContentInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Alamat } from '../../../../../core/model/alamat';
import { AlamatserviceService } from '../../../../../core/service/alamat/alamatservice.service';
import { ShareService } from '../../../../../core/service/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  address: Alamat[];
  message: string;
  dana: number;

  constructor(
    private alamatserviceService: AlamatserviceService,
    private sharedService: ShareService,
    private router: Router
  ) { this.message = 'loading'; }

  ngOnInit() {
    setTimeout(() => {
      this.message = this.sharedService.shareData;
      if (this.message === undefined) {
        this.message = 'Tidak ada pesan';
      }
    }, 500);
    this.dana = 0;
  }

  toProfile() {
    this.router.navigateByUrl('seller/profile');
  }
  widthdraw() {
    // console.log('click');
  }
}
