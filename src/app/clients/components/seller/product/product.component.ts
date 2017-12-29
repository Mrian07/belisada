import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../../servers/config/configuration';
import { AddproductService } from '../../../../servers/service/addproduct/addproduct.service';
import { StoreService } from '../../../../servers/service/store/store.service';
import { SellerProduct } from '../../../../servers/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private storeService: StoreService, private productService: AddproductService) { }
  storeId: number;
  sellerProduct: SellerProduct[];
  totalItem: number

  ngOnInit() {
    this.getSellerStore();
  }

  getSellerStore() {
    const user = JSON.parse(localStorage.user);
    const token = user.token;
    this.storeService.getAll({'token': token}).subscribe(response => {
      this.storeId = response[0].mBpartnerStoreId;
      this.getSellerProduct();
    });
  }

  getSellerProduct() {
    this.productService.GetSellerProduct(this.storeId).subscribe(data => {
      console.log(data);
      this.sellerProduct = data;
      this.totalItem = data.length;
    });
  }

}
