import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ShareButtons } from '@ngx-share/core';
import { Subscription, combineLatest } from 'rxjs';
import { ProductsSandbox } from '../products.sandbox';
import { UserData, ProductDetailV2Data } from '@belisada/core/models';
import { GetShippingResponse } from '@belisada/core/models/address/address.model';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AuthService, HomeSService, Globals } from '@belisada/core/services';
import { ChatService } from '@belisada/core/services/globals/chat.service';
import { LocalStorageEnum } from '@belisada/core/enum';
import swal from 'sweetalert2';
import { AddToCartRequest } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { ProductService } from '@belisada/core/services/product/product.service';
import { AddressService } from '@belisada/core/services/address/address.service';
import { ShareMessageService } from '@belisada/core/services';
import { Home, ProductDetailV2Spec, Isi, HomeContent } from '@belisada/core/models';
import { ProductReviewResponse } from '@belisada/core/models/product/product-review';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { CreateRoomRequest } from '@belisada/core/models/chat/chat.model';
import { JoinRoom } from '@belisada/core/interfaces/join-room.interface';
import { RoomTypeEnum } from '@belisada/core/enum/room-type.enum';


enum TabTypeEnum {
  SPEC = 'SPEC',
  DESC = 'DESC',
  DISC = 'DISC',
  REVW = 'REVW'
}

/**
 * ANCHOR Todo list PRODUCT DETAIL
 *
 * TODO Find solution for ngrx subscribe issues
 */

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
  public otherBrandProducts: HomeContent[];
  public productSpecifications: ProductDetailV2Spec[];
  public productDiscussion: Isi;
  public productReview: ProductReviewResponse[];

  public chat: CreateRoomRequest[];

  public Arr = Array;

  public flag: string;
  public btnJual: boolean;
  public pemisah: any;
  userData: UserData = new UserData();
  baseUrlSeller: string = environment.baseUrlSeller;

  public selectedImage: string;
  public tabActive: TabTypeEnum;

  /**
   *  #[(ngModel)]
   */
  public selectedShippingAddress: any;
  public selectedShippingMethod: any;
  /** --------- */

  /**
   *  #[FormGroup]
   */
  public createNewDiscussionForm: FormGroup;
  public createChatForm: FormGroup;
  /** ---------- */

  public activeVariants = [];

  public qty = 1;

  public isLogin: boolean;
  public isSubHeaderShow: boolean;

  public sliceValue = [];

  public thumborStoreImgUrl: string;
  public thumborProductImgUrl: string;
  public _masterData: number;

  public productId: number;
  public storeId: number;

  public showDialogChat: Boolean = false;

  room: any;
  message: any;
  userId: any;
  date: any;

  @HostListener('window:scroll', ['$event'])
    doSomething(event) {
      this.isSubHeaderShow = (window.pageYOffset > 645) ? true : false;
    }

  constructor(
    public globals: Globals,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    public share: ShareButtons,
    public productsSandbox: ProductsSandbox,
    private shareMessageService: ShareMessageService,
    // TODO: Change to ngrx
    private _userService: UserService,
    private _authService: AuthService,
    private _shoppingCartService: ShoppingCartService,
    private _productService: ProductService,
    private _addressService: AddressService,
    private _homeService: HomeSService,
    private _chatService: ChatService
  ) {
    this.isLogin = false;
    this.isSubHeaderShow = false;
    this.selectedShippingAddress = '';
    this.selectedShippingMethod = '';
    this.tabActive = TabTypeEnum.SPEC;

    this.thumborStoreImgUrl = environment.thumborUrl + 'unsafe/fit-in/150x150/center/filters:fill(fff)/';
    this.thumborProductImgUrl = environment.thumborUrl + 'unsafe/fit-in/400x400/center/filters:fill(fff)/';
  }

  ngOnInit() {
    this._registerEvents();
    this.btnJual = false;
    this.userData = this._userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    // this.pemisah = this.userData.role;
    // if (this.userData) { this.isLogin = true; }
    // this.pemisah = this.userData.role;

    // TODO create base sandbox to subscribe credentials
    const token = this._authService.getToken();
    if (token) this.isLogin = true;

    // TODO create function for init form
    this.createNewDiscussionForm = this._fb.group({
      discusParentId: [],
      message: ['', [Validators.required]],
      productId: ['', [Validators.required]]
    });
    // this._fetchQueryParams();

    this.createChatForm = this._fb.group({
      message: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  cekFlag() {
    this.shareMessageService.currentMessage.subscribe(respon => {
      this.flag = respon;
      if (this.flag === 'create-store') {
        this.btnJual = true;
      }
    });
  }

  goToCreateStore() {
    this._router.navigateByUrl('/buyer/create-store');
    this.cekFlag();
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
      ['/product/product-detail/'
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
    this.selectedShippingMethod = shippingMethod;
  }

  alertChat(storeId) {
    console.log('storeId:', storeId);
    this._chatService.setStoreId(storeId);
    const joinRoom = new JoinRoom();
    joinRoom.uniqueIdentifier =  this.userData.userId + '~' + storeId;
    joinRoom.senderId = this.userData.userId;
    joinRoom.receiverId = storeId;
    joinRoom.roomType = RoomTypeEnum.BS;
    this._chatService.joinRoom(joinRoom);
    this.globals.socket.on('joinReturn', () => {
      this._chatService.show();
    });
  }

  // private _loadChat(id: number) {
  //   this._productService.getDiscus(id).subscribe(discuss => {
  //     this.productDiscussion = discuss;

  //     this.productDiscussion.content.forEach((item, index) => {
  //       this.sliceValue[index] = -2;
  //     });
  //   });
  // }

  // listStore() {
  //   this._chatService.listFriends().subscribe(list => {
  //     this.chatSeller = list;
  //   });
  // }
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


  public createNewDiscussion(discusParentId?: number) {
    this.createNewDiscussionForm.patchValue({
      discusParentId: discusParentId || null,
      productId: this.product.priceData.range.productId
    });
    // console.log(this.createNewDiscussionForm.value);
    this._productService.createDiscus(this.createNewDiscussionForm.value).subscribe(rsl => {
      this._loadDiscuss(this.product.priceData.range.productId);
      this.createNewDiscussionForm.reset();
    });
  }

  public createChat(room: any) {
    this.room = room;
    this.createChatForm.patchValue({
      userId: this.userId,
      date: new Date()
    });
    this._chatService.sendMessage(this.createChatForm.value, this.room);
  }


  public encodeUrl(name) {
    return name.replace(new RegExp('/', 'g'), ' ');
  }

  /**
   * Load shipping method
   * @param params productId: number; rajaOngkirId: number; weight: number
   */
  private _loadShippingMethod(params: {productId: number; rajaOngkirId: number; weight: number}) {
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
      this.productDiscussion = discuss;

      this.productDiscussion.content.forEach((item, index) => {
        this.sliceValue[index] = -2;
      });
    });
  }

  //   /**
  //  * get review by product id
  //  * @param id productId
  //  */
  // private _loadReview(id: number) {
  //   this._productService.getReview(id).subscribe(review => {
  //     this.productReview = review;

  //     this.productReview.content.forEach((item, index) => {
  //       this.sliceValue[index] = -2;
  //     });
  //   });
  // }

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
        console.log('product: ', product);
        if (product.status === 1) {
          this._masterData = product.data.masterId;
        }
        if (product.status === 0) {
            swal({
              title: 'belisada.co.id',
              text: 'Mohon maaf produk yang anda cari untuk saat ini belum ada.',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Ikut Jualan',
              cancelButtonText: 'Kembali Belanja',
              confirmButtonColor: '#f68a43',
              cancelButtonColor: '#1a960e',
              reverseButtons: true
            })
            .then((result) => {
              if (result.value) {
                window.open(
                  environment.baseUrlSeller + '/products/' + this._masterData, // <- hit master data ID
                  '_blank' // <- This is what makes it open in a new window.
                );
              }});
            this._router.navigate(
              ['/']
              // ['/product/product-detail/'
              //   + this._route.snapshot.params.id
              //   + '/'
              //   + this._route.snapshot.params.name]
            );
            return;
        }
        this.product = product.data;
        // console.log(product.data);
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

          if (this.product.priceData.isDetail) {
            this._loadDiscuss(this.product.priceData.range.productId);

            this._productService.getReview(this.product.priceData.range.productId).subscribe(rev => {
              console.log('hasilnya', rev);
              this.productReview = rev;
            });
          }

          this._productService.getProductDetailV2Store(id, queryParams).subscribe((storeInfo) => {
            this.product['storeInfo'] = storeInfo.data;

            this._addressService.getShipping().subscribe((address) => {
              if (address.length > 0) {
                this.selectedShippingAddress = address.find(x => x.isDefault === true);
              }
              this.shippingAddresses = address;
              this._loadShippingMethod({
                productId: this.product.priceData.range.productId,
                rajaOngkirId: this.selectedShippingAddress.rajaOngkirId,
                weight: this.product.weight * this.qty
              });
            });
          });
        });
      });

      this._homeService.getHomePopular().subscribe(res => {
        this.otherBrandProducts = res.content;
      });

      this._productService.getProductDetailV2Spec(id).subscribe(specs => {
        this.productSpecifications = specs;
      });
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

  /*
  * #gOTo product lain
  */
  gotoPenawaran(e) {
    this._router.navigate(['/product/another-offers/' + e ]);
    window.scrollTo(0, 0);
  }

}
