import { Injectable, Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Alamat } from '../../../../../core/model/alamat';
import { AlamatserviceService } from '../../../../../core/service/alamat/alamatservice.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  address: Alamat[];


  constructor(private alamatserviceService: AlamatserviceService) {
  }

  ngOnInit() {
    this.getalat();
  }

  getalat() {
    // this.alamatserviceService.getAlamat(this.token).subscribe(data => {
    //   this.address = data;
    // });
  }

}
