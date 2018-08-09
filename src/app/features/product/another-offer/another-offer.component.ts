import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../core/services/product/product.service';
import { ProductDetailList, Filter, FilterOffers } from '@belisada/core/models/product/product.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { ShoppingCartService } from './../../../core/services/shopping-cart/shopping-cart.service';
import { AuthService } from '@belisada/core/services';
import { AddressService } from './../../../core/services/address/address.service';

@Component({
  selector: 'app-another-offer',
  templateUrl: './another-offer.component.html',
  styleUrls: ['./another-offer.component.scss']
})
export class AnotherOfferComponent implements OnInit {
  cartItem: number;
  productDetail: ProductDetailList = new ProductDetailList();
  filter: Filter = new Filter();
  filterOffers: FilterOffers[];

  myForm: FormGroup;

  addressId: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private addressService: AddressService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cartItem = 1;
    this.loadData();
    this.destinationId();
    this.myForm = this.fb.group({
      courier: this.fb.array([]),
      classification: this.fb.array([]),
    });
  }

  destinationId(){

  //   const queryParam = {
  //     itemCartIds: this.authService.getToken(),
  //   };

    this.addressService.getShipping().subscribe(res => {
      this.addressId = res[0].addressId;
   });
  }

  loadData() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        const queryParams = {
          page: 1,
          ot: 'asc',
          ob: 'name',
          id: params['id']
        };
        this.productService.getOffers(queryParams).subscribe(respon => {
          this.filter = respon;
          console.log('hasil offer', respon);
          this.productService.getFilterOffers(queryParams).subscribe(respons => {
            this.filterOffers = respons;
          });
        });

      });
    });
  }

  getFilId(title,name, isChecked: boolean){
    let listCourier:FormArray = <FormArray> this.myForm.controls.courier;
    let listClassification:FormArray = <FormArray> this.myForm.controls.classification;

    switch (title) {
      case 'Courier':
        listCourier = <FormArray> this.myForm.controls.courier;
        if(isChecked==true){
          listCourier.push(new FormControl(name));     
        }else{
          const index = listCourier.controls.findIndex(x => x.value === name);
          listCourier.removeAt(index);
        }
        break;

      case 'Classification':
        listClassification = <FormArray> this.myForm.controls.classification;
        if(isChecked==true){
          listClassification.push(new FormControl(name));     
        }else{
          const index = listClassification.controls.findIndex(x => x.value === name);
          listClassification.removeAt(index);
        }
        break;
    
      default:
        console.log('not specified');
        break;
    }

    // console.log('listClassification: ', listClassification.value);

    // const queryParams = {
    //   shipping: listCourier.value,
    //   classification: listClassification.value,
    // }


    this.activatedRoute.params.subscribe((params: Params) => {

      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        const queryParams = {
          page: 1,
          ot: 'asc',
          ob: 'name',
          id: params['id'],
          shipping: listCourier.value,
          classification: listClassification.value,
        };
        this.productService.getOffers(queryParams).subscribe(respon => {
          this.filter = respon;
          // console.log('hasil offer', respon);

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
