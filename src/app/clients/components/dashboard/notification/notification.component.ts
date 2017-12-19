import { Alamat } from './../../../../servers/model/alamat';
import { AlamatserviceService } from './../../../../servers/service/alamat/alamatservice.service';
import { Injectable, Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  address: Alamat[];
  token = `eyJhbGciOiJIUzI1NiJ9.eyJVc2VyRGF0YSI6eyJuYW1lIjoid2FoeXUxIHdhaHl1IG5pY2giLCJlbWFpbCI6IndhaHl1LnN1aXRAbXlhY2ljby5jb20iLCJyb2xlIjoiQjJDIiwiYXZhdGFyIjoiaHR0cDovL3d3dy5uZXdzc2hhcmUuaW4vd3AtY29udGVudC91cGxvYWRzLzIwMTcvMDQvTWluaWNsaXAtOC1CYWxsLVBvb2wtQXZhdGFyLTgucG5nIiwidXNlcklkIjoxMDAwMjI5fSwiaXNzIjoid2FoeXUuc3VpdEBteWFjaWNvLmNvbSIsInN1YiI6IndhaHl1MSB3YWh5dSBuaWNoIiwiYXVkIjoiQjJDIiwiZXhwIjoxNTE0MjU4NzAwLCJpYXQiOjE1MTM2NTM5MDAsImp0aSI6IjEwMDAyMjkifQ.a8J3FqatKT3Ups3WL_W-2lWqxFVRtspxs0qrNzXF_NA`;
  constructor(private alamatserviceService: AlamatserviceService) {
  }

  ngOnInit() {
    this.getalat();
  }

  getalat() {
    this.alamatserviceService.getAlamat(this.token).subscribe(data => {
      this.address = data;
      console.log(this.address);
    });
  }

}
