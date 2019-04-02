import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UserData, Home, HomeContent, Brand, FlashSaleContent, FlashSaleExpiredData } from '@belisada/core/models';
import { StoreService, UserService, HomeSService } from '@belisada/core/services';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-list-event',
  templateUrl: './product-list-event.component.html',
  styleUrls: ['./product-list-event.component.scss']
})
export class ProductListEventComponent implements OnInit {
  public cdnUrl = environment.cdnUrl;
  productImageUrl;
  productStoreUrl;
  imageDummy;
  imageDmy;
  imageHeader;
  brandImageUrl;
  imageHeaderNya;
  public Arr = Array;
  public homeContents: HomeContent[] = [];
  public flashSaleProducts: FlashSaleContent[] = [];
  constructor(
    private router: Router,
    private _homeService: HomeSService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.productImageUrl = environment.thumborUrl + 'unsafe/fit-in/400x400/center/filters:fill(fff)/';
    // this.brandImageUrl = environment.thumborUrl + 'unsafe/fit-in/1000x1000/center/filters:fill(fff)/';
    // this.productStoreUrl = environment.thumborUrl + 'unsafe/50x50/center/filters:fill(fff)/';
    // this.imageHeader = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
    // this.imageDmy = environment.thumborUrl + 'unsafe/fit-in/150x150/center/filters:fill(fff)/';
    // this.imageHeaderNya = this.cdnUrl + '/imageproductbrand/7bb882a8-3c31-40bd-8356-4974a4ce0595.png';
    // this.imageDummy = this.cdnUrl + '/imageproductbrand/2ad61795-9903-4efe-a8a8-ffbdfe705d0c.jpeg';
  }

  ngOnInit() {
    this._getFlashSale();
  }

  public encodeUrl(name) {
    return name.replace(new RegExp('/', 'g'), ' ');
  }

  private _getFlashSale() {
    const queryParams = {
      itemperpage: 15,
      page: 1
    };
    this._homeService.getFlashSale(queryParams).subscribe(response => {
      this.flashSaleProducts = response.content;
    });
  }

  goToDetail(id, name) {
    const r = this.encodeUrl(name);
    // if (r === ' ') {
    //   this.router.navigate(['/product/product-detail/' + id + '/' + 'yourItem']);
    // } else {
      this.router.navigate(['/product/product-detail/' + id + '/' + r]);
    // }
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

}
