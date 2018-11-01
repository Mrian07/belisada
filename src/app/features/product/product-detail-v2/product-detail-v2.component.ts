import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ShareButtons } from '@ngx-share/core';
import { Subscription, combineLatest } from 'rxjs';
import { ProductsSandbox } from '../products.sandbox';
import { GetShippingResponse } from '@belisada/core/models/address/address.model';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AuthService, HomeSService } from '@belisada/core/services';
import swal from 'sweetalert2';
import { AddToCartRequest } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { ProductService } from '@belisada/core/services/product/product.service';
import { AddressService } from '@belisada/core/services/address/address.service';
import { Home, ProductDetailV2Spec, Isi } from '@belisada/core/models';

enum TabTypeEnum {
  SPEC = 'SPEC',
  DESC = 'DESC',
  DISC = 'DISC',
  REVW = 'REVW'
}

@Component({
  selector: 'app-product-detail-v2',
  templateUrl: './product-detail-v2.component.html',
  styleUrls: ['./product-detail-v2.component.scss'],
})
export class ProductDetailV2Component implements OnInit, OnDestroy {

  private _subscriptions: Array<Subscription> = [];

  public tabTypeEnum = TabTypeEnum;

  public shippingAddresses: GetShippingResponse[];
  public shippingMethod: ShippingRate[];

  public product;
  public otherBrandProducts: Home[];
  public productSpecifications: ProductDetailV2Spec[];
  public productDiscussion: Isi;

  public selectedImage: string;
  public tabActive: TabTypeEnum;

  /**
   *  #[(ngModel)]
   */
  public selectedShippingAddress: any;
  public selectedShippingMethod: any;
  /** --------- */

  public activeVariants = [];

  public qty = 1;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _router: Router,
    public share: ShareButtons,
    public productsSandbox: ProductsSandbox,

    // TODO: Change to ngrx
    private _userService: UserService,
    private _authService: AuthService,
    private _shoppingCartService: ShoppingCartService,
    private _productService: ProductService,
    private _addressService: AddressService,
    private _homeService: HomeSService
  ) {
    this.selectedShippingAddress = '';
    this.selectedShippingMethod = '';
    this.tabActive = TabTypeEnum.SPEC;
  }

  ngOnInit() {
    this._registerEvents();
    // this._fetchQueryParams();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Select variant and change url
   * @param attributeId Attribute variant ID
   * @param attributeValueId Attribute variant Value ID
   * @param index Attribute position in array
   */
  public selectVariant(attributeId, attributeValueId, index) {
    this.activeVariants[index] = [attributeId, attributeValueId].join(':');

    let queryValueString = this.activeVariants.toString();
    if (this.activeVariants.includes('')) queryValueString = queryValueString.replace(/,/g, '');

    this._router.navigate(
      ['/product/product-detail-v2/'
        + this._route.snapshot.params.id
        + '/'
        + this._route.snapshot.params.name],
      {
        queryParams: {
          varians: queryValueString
        }
      }
    );
  }

  /**
   * Update quantity product
   * @param qty Quantity product
   */
  public setQty(qty) {
    this.qty = qty;

    this._loadShippingMethod({
      productId: this.product.priceData.range.productId,
      rajaOngkirId: this.selectedShippingAddress.rajaOngkirId,
      weight: this.product.weight * this.qty
    });
  }

  /**
   * Shipping address on change
   * @param shippingAddress Shipping address object
   */
  public changeShippingAddress() {
    console.log('changeShippingAddress');

    this._loadShippingMethod({
      productId: this.product.priceData.range.productId,
      rajaOngkirId: this.selectedShippingAddress.rajaOngkirId,
      weight: this.product.weight * this.qty
    });
  }

  /**
   * Shipping method on change
   * @param shippingMethod Shipping method object
   */
  public changeShippingMethod(shippingMethod) {
    console.log('shippingMethod: ', shippingMethod);
    this.selectedShippingMethod = shippingMethod;
  }

  /**
   * Add to cart
   */
  public addToCart() {
    const productId = this.product.priceData.range.productId;
    const userData = this._userService.getUserData(this._authService.getToken());

    if (userData) {
      if (userData.storeId === this.product.storeInfo.storeId) {
        swal(
            'belisada.co.id',
            'Product ini berasal dari Toko Anda'
          );
      } else {
        const addToCartRequest: AddToCartRequest = {
          productId: this.product.priceData.range.productId,
          quantity: this.qty,
          courierCode: this.selectedShippingMethod.courierCode,
          courierService: this.selectedShippingMethod.courierService,
          shippingAddressId: this.selectedShippingAddress.addressId
        };

        this._shoppingCartService.create(addToCartRequest).subscribe(response => {
          if (response.status === 1) {
            this._shoppingCartService.addItem(productId, +this.qty, +response.itemCartId);
          } else {
            swal('belisada.co.id', response.message, 'error');
          }
        });
      }
    } else {
      this._shoppingCartService.addItem(productId, +this.qty);
    }
  }


  public encodeUrl(name) {
    return name.replace(new RegExp('/', 'g'), ' ');
  }

  /**
   * Load shipping method
   * @param params productId: number; rajaOngkirId: number; weight: number
   */
  private _loadShippingMethod(params: {productId: number; rajaOngkirId: number; weight: number}) {
    console.log('_loadShippingMethod');
    // TODO: Change productId and weight as API ready
    const queryParams = {
      productId: params.productId,
      destinationId: params.rajaOngkirId,
      weight: params.weight
    };
    if (this.product.priceData.isDetail) {
      this._shoppingCartService.getShippingRates(queryParams).subscribe((shippingMethods) => {
        this.shippingMethod = shippingMethods;
        if (this.shippingMethod.length !== 0) {
          this.shippingMethod.sort((a, b) => a.courierPrice - b.courierPrice);
          this.selectedShippingMethod = this.shippingMethod[0];
        }
      });
    }
  }

  /**
   * get discuss by product id
   * @param id productId
   */
  private _loadDiscuss(id: number) {
    this._productService.getDiscus(id).subscribe(discuss => {
      console.log('discuss: ', discuss);
    });
  }

  /**
   * Fetch query params
   */
  // TODO: Tune performance, why this method called repeatedly
  private _fetchQueryParams() {
    this._route.queryParams.subscribe(queryParam => {
      if (queryParam.varians) {
        const variants = queryParam.varians.split(',');
        variants.forEach(variant => {
          const index = this.product.variants.findIndex(x => x.attributeId === +variant.split(':')[0]);
          this.activeVariants[index] = variant;
        });
      }
    });
  }

  /**
   * Registers events
   */
  // TODO: change to ngrx
  private _registerEvents(): void {
    const obsParams = combineLatest(this._route.params, this._route.queryParams,
      (params, qparams) => ({ params, qparams }));

    obsParams.subscribe((route) => {
      const id = route.params.id;
      const queryParams = route.qparams;

      this._productService.getProductDetailV2(id, queryParams).subscribe((product) => {
        this.product = product.data;
        this.selectedImage = product.data.imageUrl[0];

        this._productService.getProductDetailV2Variant(id).subscribe((variants) => {
          this.product['variants'] = variants;
          this.activeVariants = [];
          variants.forEach(variant => {
            this.activeVariants.push('');
          });

          this._fetchQueryParams();
        });

        this._productService.getProductDetailV2Price(id, queryParams).subscribe((price) => {
          this.product['priceData'] = price.data;

          if (this.product.priceData.isDetail) this._loadDiscuss(this.product.priceData.range.productId);

          this._productService.getProductDetailV2Store(id, queryParams).subscribe((storeInfo) => {
            this.product['storeInfo'] = storeInfo.data;

            this._addressService.getShipping().subscribe((address) => {
              if (address.length > 0) {
                this.selectedShippingAddress = address.find(x => x.isDefault === true);
              }
              this.shippingAddresses = address;
              console.log('this.product.priceData.range.productId: ', this.product.priceData.range.productId);
              this._loadShippingMethod({
                productId: this.product.priceData.range.productId,
                rajaOngkirId: this.selectedShippingAddress.rajaOngkirId,
                weight: this.product.weight * this.qty
              });
            });
          });
        });
      });
    });

    this._homeService.getHomeNew().subscribe(res => {
      this.otherBrandProducts = res;
    });

    this._productService.getProductDetailV2Spec(this._route.snapshot.params.id).subscribe(specs => {
      console.log('specs: ', specs);
      this.productSpecifications = specs;
    });

    // this.productsSandbox.loadShippingAddress();


    // // Subscribes to shipping addresses
    // this._subscriptions.push(this.productsSandbox.shippingAddress$.subscribe((address) => {
    //   if (address) {
    //     if (address.length > 0) {
    //       this.selectedShippingAddress = address.find(x => x.isDefault === true);
    //     }
    //     this.shippingAddresses = address;
    //   }
    // }));

    // // Subscribes to shipping methods
    // this._subscriptions.push(this.productsSandbox.shippingMethod$.subscribe((shippingMethods) => {
    //   if (shippingMethods) {
    //     this.shippingMethod = shippingMethods;
    //   }
    // }));

    // Subscribes to product details
    // this._subscriptions.push(this.productsSandbox.productDetails$.subscribe((product) => {
    //   if (product) {
    //     this._changeDetector.markForCheck();
    //     this.product = product.data;
    //     this.selectedImage = product.data.imageUrl[0];

    //     // TODO: Find better methods
    //     // Subscribes to product details price
    //     this.productsSandbox.productDetailsPrice$.subscribe(price => {
    //       if (price) {
    //         this._changeDetector.markForCheck();
    //         this.product['priceData'] = price.data;

    //         // Subscribes to product details store
    //         this.productsSandbox.productDetailsStore$.subscribe(storeInfo => {
    //           if (storeInfo) {
    //             this._changeDetector.markForCheck();
    //             this.product['storeInfo'] = storeInfo.data;

    //             // Subscribes to shipping address
    //             this.productsSandbox.shippingAddress$.subscribe((address) => {
    //               if (address) {
    //                 if (address.length > 0) {
    //                   this.selectedShippingAddress = address.find(x => x.isDefault === true);
    //                 }
    //                 this.shippingAddresses = address;
    //                 console.log('this.product.priceData.range.productId: ', this.product.priceData.range.productId);
    //                 this._loadShippingMethod({
    //                   productId: this.product.priceData.range.productId,
    //                   rajaOngkirId: this.selectedShippingAddress.rajaOngkirId,
    //                   weight: this.product.weight * this.qty
    //                 });
    //               }
    //             });
    //           }
    //         });
    //       }
    //     });

    //     // Subscribes to product details variant
    //     this.productsSandbox.productDetailsVariant$.subscribe(variants => {
    //       if (variants) {
    //         // this._changeDetector.markForCheck();
    //         this.product['variants'] = variants;
    //         this.activeVariants = [];
    //         variants.forEach(variant => {
    //           this.activeVariants.push('');
    //         });

    //         this._fetchQueryParams();
    //       }
    //     });

    //     // subscribes to shipping method
    //     this.productsSandbox.shippingMethod$.subscribe((shippingMethods) => {
    //       if (shippingMethods) {
    //         this.shippingMethod = shippingMethods;
    //         if (this.shippingMethod.length !== 0) {
    //           this.shippingMethod.sort((a, b) => a.courierPrice - b.courierPrice);
    //           this.selectedShippingMethod = this.shippingMethod[0];
    //         }
    //       }
    //     });
    //   }
    // }));
  }
}
