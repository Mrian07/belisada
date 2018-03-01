import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/service/product/product.service';
import { TokenService } from '../../../../core/service/token/token.service';
import { CartItemRequest } from '../../../../core/model/shoppingcart/cart-item';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import { ProductDetailService } from '../../../../core/service/product-detail/product-detail.service';
import { WishlistBuyerService } from '../../../../core/service/wishlist-buyer/wishlist-buyer.service';

@Component({
  selector: 'app-product-top-buyer',
  templateUrl: './product-top-buyer.component.html',
  styleUrls: ['./product-top-buyer.component.scss']
})
export class ProductTopBuyerComponent implements OnInit {

  productId: any;
  productData: any;
  allProduct: any;
  whistlist: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private tokenService: TokenService,
    private shoppingCartService: ShoppingCartService,
    private detailService: ProductDetailService,
    private wishlistBuyerService: WishlistBuyerService
  ) { }

  ngOnInit() {
    // this.getWishlist();
    this.productTop();
  }

  getWishlist() {
    this.wishlistBuyerService.getAll().subscribe(data => {
      this.whistlist = data;
      // console.log('this.whistlist: ', this.whistlist);
    });
  }

  productTop() {
    this.route.params.subscribe( params => {
    this.productId = params.id;
    this.productService.ProductNew(this.productId).subscribe(datas => {
        // console.log('datas: ', datas);
        this.productData = datas;
        this.allProduct = this.productData.productList;
      });
    });
  }

  public addProductToCart(productId: number, quantity: number, mstoreId: number): void {
    const user = this.tokenService.getUser();
    let stID = 0;
 
   if (user) {
      if (user.stores.length !== 0) {
        stID = user.stores[0].mBpartnerStoreId;
      }
      if (stID === mstoreId) {
        swal(
          'Belisada.co.id',
          'Product ini berasaldari Toko Anda'
        );
      } else {
        if (quantity === undefined) {
          swal(
            'Belisada.co.id',
            'Jumlah harus di pilih!'
          );
        } else {
          const product: any = this.allProduct.find(x => x.productId === productId);
          
          const cartItemRequest: CartItemRequest = new CartItemRequest();
          cartItemRequest.productId = product.productId;
          cartItemRequest.price = product.pricelist;
          cartItemRequest.weightPerItem = product.weight;
          cartItemRequest.quantity = quantity;
  
          if (user) {
            this.shoppingCartService.create(cartItemRequest).subscribe(response => {
              // console.log('response: ', response);
              this.shoppingCartService.addItem(productId, +quantity, +response.id);
            });
          } else {
            this.shoppingCartService.addItem(productId, +quantity);
          }
        }
      }
    } else {
      this.shoppingCartService.addItem(productId, +quantity);
    }
  }

  addToWishlist(productId) {
    const data = {
      productId: productId
    };
    this.detailService.create(data).subscribe(response => {
      if (response.status === '1') {
        swal('Terimakasih, Item Anda Sudah Masuk Kedalam Wishlist');
      } else {
        swal(response.message);
      }
    });
  }

}
