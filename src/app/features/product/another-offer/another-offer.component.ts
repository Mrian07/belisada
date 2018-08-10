import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../core/services/product/product.service';
import { ProductDetailList, Filter, FilterOffers } from '@belisada/core/models/product/product.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { ShoppingCartService } from './../../../core/services/shopping-cart/shopping-cart.service';
import { AuthService } from '@belisada/core/services';
import { AddressService } from './../../../core/services/address/address.service';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';

@Component({
  selector: 'app-another-offer',
  templateUrl: './another-offer.component.html',
  styleUrls: ['./another-offer.component.scss']
})
export class AnotherOfferComponent implements OnInit {
  cartItem = [];
  cartItem2: number;

  productDetail: ProductDetailList = new ProductDetailList();
  filter: Filter = new Filter();
  filterOffers: FilterOffers[];

  myForm: FormGroup;

  shippingR: any[];

  addressId: number;
  shipRates = [];
  rates = [];
  shippingRates = [];

  sortUrut: string;
  sortName: string;
  currentPage: number;
  lastPage: number;
  pages: any = [];
  brandImageUrl: any;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loadData();
    this.myForm = this.fb.group({
      courier: this.fb.array([]),
      classification: this.fb.array([]),
    });
  }


  loadData() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];

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
          this.lastPage = this.filter.totalPages;
          for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
            if (r > 0 && r <= this.filter.totalPages) {
              this.pages.push(r);
            }
          }

          console.log('list prod', respon);

          this.addressService.getShipping().subscribe(res => {
            this.addressId = res[0].addressId;

            respon.content.forEach((cart, index) => {
              this.cartItem[index] = 1;
              this.cartItem2 = 1;
              this.shippingRates[index] = '';

              const queryParams = {
                productId: cart.productId,
                weight: cart.originId,
                originId: cart.weight,
                destinationId: this.addressId,
              };


              this.shoppingCartService.getShippingRates(queryParams).subscribe(resship => {
                this.shipRates[index] = resship;
                console.log('this.shipRates', this.shipRates);
              });

            });
          });

          this.productService.getFilterOffers(queryParams).subscribe(respons => {
            this.filterOffers = respons;
          });
        });

      });
    });
  }

  getFilId(title, name, isChecked: boolean) {
    let listCourier: FormArray = <FormArray> this.myForm.controls.courier;
    let listClassification: FormArray = <FormArray> this.myForm.controls.classification;

    switch (title) {
      case 'Courier':
        listCourier = <FormArray> this.myForm.controls.courier;
        if ( isChecked === true) {
          listCourier.push(new FormControl(name));
        } else {
          const index = listCourier.controls.findIndex(x => x.value === name);
          listCourier.removeAt(index);
        }
        break;

      case 'Classification':
        listClassification = <FormArray> this.myForm.controls.classification;
        if (isChecked === true) {
          listClassification.push(new FormControl(name));
        } else {
          const index = listClassification.controls.findIndex(x => x.value === name);
          listClassification.removeAt(index);
        }
        break;

      default:
        console.log('not specified');
        break;
    }

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


  decreaseQty(cartItem, index) {
    if (cartItem > 1) {
      this.cartItem[index] = cartItem - 1;
    }
  }

  increaseQty(cartItem, index) {
    this.cartItem[index] = cartItem + 1;
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.filter.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/product/another-offer'], { queryParams: {page: page, ob: this.sortName, ot: this.sortUrut}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
