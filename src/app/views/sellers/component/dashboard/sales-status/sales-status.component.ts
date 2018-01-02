import { Injectable, Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { SalesStatus } from '../../../../../core/model/sales-status';
import { SalesStatusService } from '../../../../../core/service/salesstatus/sales-status.service';

@Component({
  selector: 'app-sales-status',
  templateUrl: './sales-status.component.html',
  styleUrls: ['./sales-status.component.scss']
})
export class SalesStatusComponent implements OnInit {
  test: SalesStatus[];
  token = 'eyJhbGciOiJIUzI1NiJ9.eyJVc2VyRGF0YSI6e'
  + 'yJuYW1lIjoid2FoeXUxIHdhaHl1IG5pY2giLCJlbWFpbCI6IndhaHl1LnN1aXRAbXlhY2ljby5jb20iLCJyb2x'
  + 'lIjoiQjJDIiwiYXZhdGFyIjoiaHR0cDovL3d3dy5uZXdzc2hhcmUuaW'
  + '4vd3AtY29udGVudC91cGxvYWRzLzIwMTcvMDQvTWluaWNsaXAtOC1CYW'
  + 'xsLVBvb2wtQXZhdGFyLTgucG5nIiwidXNlcklkIjoxMDAwMjI5fSwiaXNzIjoid2FoeX'
  + 'Uuc3VpdEBteWFjaWNvLmNvbSIsInN1YiI6IndhaHl1MSB3YWh5dSBuaWNoIiwiYXVkIjoiQjJDIiwiZXhwIjoxNT'
  + 'E0MzQzNjk2LCJpYXQiOjE1MTM3Mzg4OTYsImp0aSI6IjEwMDAyMjkifQ.ODnxEcBEdJ1xXPz-0VZxfMo2eCWQzGDPcAdnSYVtj7w';
  constructor(private salesstatus: SalesStatusService) { }

  ngOnInit() {
    this.getStatus();
  }
  getStatus() {
    // this.salesstatus.getstatus(this.token).subscribe(data => {
    //   this.test = data;
    //   console.log('ini nih', this.test);
    // });
  }

}
