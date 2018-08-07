import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../core/services/product/product.service';
import { ProductDetailList, Filter, FilterOffers } from '@belisada/core/models/product/product.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-another-offer',
  templateUrl: './another-offer.component.html',
  styleUrls: ['./another-offer.component.scss']
})
export class AnotherOfferComponent implements OnInit {
  cartItem: number;
  productDetail: ProductDetailList = new ProductDetailList();
  filter: Filter[];
  filterOffers: FilterOffers[];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cartItem = 1;
    this.loadData();
  }

  loadData() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        const queryParams = {
          id: params['id']
        };
        this.productService.getOffers(queryParams).subscribe(respon => {
          this.filter = respon;

          this.productService.getFilterOffers(queryParams).subscribe(respons => {
            console.log('apa ini', respons);
            this.filterOffers = respons;
          });
        });

      });
    });
  }


  decreaseQty(cartItem) {
    if(cartItem >1){
      this.cartItem = cartItem-1;
    }
    

    // if (cartItem.quantity > 1) {
    //   const data = {
    //     itemCartId: cartItem.itemCartId,
    //     note: '',
    //     quantity: --cartItem.quantity
    //   };
    //   this.shoppingCartService.updateCart(data).subscribe(response => {
    //     if (response.status === 1) {
    //       this.shoppingCartService.updateQuantity(cartItem.productId, -1);
    //       this.getCartCheckout();
    //     }
    //   });
    // }
  }

  increaseQty(cartItem) {
    this.cartItem = cartItem+1;
    // const data = {
    //   itemCartId: cartItem.itemCartId,
    //   note: '',
    //   quantity: ++cartItem.quantity
    // };
    // this.shoppingCartService.updateCart(data).subscribe(response => {
    //   if (response.status === 1) {
    //     this.shoppingCartService.updateQuantity(cartItem.productId, +1);
    //     this.getCartCheckout();
    //   }
    // });
  }

}
