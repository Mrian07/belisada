import { Injectable, Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { MyTopProduct } from '../../../../../../core/model/my-top-product';
import { MyTopProductService } from '../../../../../../core/service/mytopproduct/my-top-product.service';

@Component({
  selector: 'app-m-my-top-produk',
  templateUrl: './m-my-top-produk.component.html',
  styleUrls: ['./m-my-top-produk.component.scss']
})
export class MMyTopProdukComponent implements OnInit {

  topproduct: MyTopProduct[];
  token = 'eyJhbGciOiJIUzI1NiJ9.eyJVc2VyRGF0YSI6e'
  + 'yJuYW1lIjoid2FoeXUxIHdhaHl1IG5pY2giLCJlbWFpbCI6IndhaHl1LnN1aXRAbXlhY2ljby5jb20iLCJyb2x'
  + 'lIjoiQjJDIiwiYXZhdGFyIjoiaHR0cDovL3d3dy5uZXdzc2hhcmUuaW'
  + '4vd3AtY29udGVudC91cGxvYWRzLzIwMTcvMDQvTWluaWNsaXAtOC1CYW'
  + 'xsLVBvb2wtQXZhdGFyLTgucG5nIiwidXNlcklkIjoxMDAwMjI5fSwiaXNzIjoid2FoeX'
  + 'Uuc3VpdEBteWFjaWNvLmNvbSIsInN1YiI6IndhaHl1MSB3YWh5dSBuaWNoIiwiYXVkIjoiQjJDIiwiZXhwIjoxNT'
  + 'E0MzQzNjk2LCJpYXQiOjE1MTM3Mzg4OTYsImp0aSI6IjEwMDAyMjkifQ.ODnxEcBEdJ1xXPz-0VZxfMo2eCWQzGDPcAdnSYVtj7w';

  constructor(private mytopProduct: MyTopProductService) { }

  ngOnInit() {
    this.getWishlist();
  }
  getWishlist() {
    // this.mytopProduct.getWishlist(this.token).subscribe(data => {
    //   this.topproduct = data;
    //   console.log('test', this.topproduct);
    // });
  }
}
