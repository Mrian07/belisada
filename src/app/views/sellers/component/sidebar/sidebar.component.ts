import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import { ActiveLink, ShareService } from '../../../../core/service/shared.service';
import { TokenService } from '../../../../core/service/token/token.service';
import { StoreService } from '../../../../core/service/store/store.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { FlagService } from '../../../../core/service/flag.service';
import { CourierService } from './../../../../core/service/courier/courier.service';
import { Courier } from '../../../../core/model/courier';

export class Option {
  name: any;
  value: number;
  checked: Boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerimage: string;
  storeName: string;
  storeDesc: string;
  status1: Boolean = true;
  status2: Boolean = false;
  status3: Boolean = false;
  status4: Boolean = false;
  status: any;
  lang: any;

  user: any;
  stores: any = [];

  pathArray: any;
  activeLink: any;
  eCheckDisabled: any;
  eCheckReadonly: any;

  message: string;
  courierList: Courier[];
  options: Array<Option> = new Array<Option>();

  constructor(private router: Router,
  private profileService: ProfileService,
  private active: ActiveLink,
  private sharedService: ShareService,
  private tokenService: TokenService,
  private storeService: StoreService,
  private translate: TranslateService,
  private flagService: FlagService,
  private courierService: CourierService
) {  }


  ngOnInit() {
    this.getUri();
    this.getStoreStatus();
    this.lang = localStorage.getItem('language');
    if (this.lang) {
      this.translate.use(this.lang);
    }
    this.user = this.tokenService.getUser();

    this.uploadPhoto();
    this.getProfile();
    this.storeService.getAll().subscribe(response => {
      console.log('response: ', response);
      this.stores = response;
      this.courier();
    });
  }

  courier() {
    if (this.stores.length !== 0) {
      this.courierService.getByStoreId(this.stores[0].mBpartnerStoreId).subscribe(response => {
        console.log('response: ', response);
        response.forEach(courier => {
          this.options.push({
            name: courier.name,
            value: courier.shipperId,
            checked: courier.used === 'Y' ? true : false
          });
        });
      });
    }
  }

  get selectedOptions() { // right now: ['1','3']
    const couriers = [];
    const checkboxes = (<HTMLInputElement[]><any>document.getElementsByName('couriers'));

    checkboxes.forEach(x => {
      couriers.push({
        shipperId: +x.value,
        used: x.checked === true ? 'Y' : 'N'
      });
    });

    return couriers;
  }

  onSubmit() {
    const data = {
      mBpartnerStoreId: this.stores[0].mBpartnerStoreId,
      shipper: this.selectedOptions
    };

    this.courierService.save(data).subscribe(x => {
      if (x.status === '1') {

      }
      swal(x.message);
    });
  }

  uploadPhoto() {
    this.flagService.currentMessage.subscribe(respon => {
      this.message = respon;
      if (this.message === 'upload-photo') {
        this.getProfile();
      }
    });
  }

  getStoreStatus() {
    this.storeService.getStatus().subscribe(data => {
      if (data.length === 0) { return; }
      this.status = data[0].statusCode;
      this.storeName = data[0].name;
      this.storeDesc = data[0].description;
    });
  }

  getUri() {
    this.pathArray = window.location.pathname.split( '/' );
    this.activeLink = this.pathArray[2];
  }

  editProfile() {
    this.router.navigate(['/seller/profile']);
  }

  goChangePassword() {
    this.router.navigate(['/seller/change-password']);
  }

  goRekening() {
    this.router.navigateByUrl('/seller/rekening');
  }

  goInfoToko() {
    this.router.navigateByUrl('/seller/toko');
  }

  goDashboard() {
    this.router.navigate(['/seller/dashboard']);
  }

  goKontak() {
    this.router.navigate(['/seller/kontak']);
  }

  goCourier() {
    this.router.navigate(['/seller/courier']);
  }

  goPaymentInfo() {
    this.router.navigate(['/seller/payment-info']);
  }

  goSallesReport() {
    this.router.navigate(['/seller/salles-report']);
  }

  goFaqSeller() {
    this.router.navigate(['/seller/faq-seller']);
  }

  getProfile() {
    this.profileService.getProfile(this.tokenService.getToken()).subscribe(data => {
      this.sellerName = data.name;
      this.sellerEmail = data.email;
      if (data.imageAvatar === '') {
        this.sellerimage = 'assets/img/kristy.png';
      }else {
        this.sellerimage = 'data:image/png;base64,' + data.imageAvatar;
      }
     // console.log(this.sellerimage);
    });
  }
  goToProduct() {
    if (this.status === '2') {
      swal(
        'Belisada.co.id',
        'Toko Anda belum diverifikasi!'
      ).then((result) => {
       // this.router.navigateByUrl('seller/toko');
      });
    }else {
      this.router.navigateByUrl('seller/product-list');
    }
  }
  gotoDana() {
    this.router.navigateByUrl('seller/tarik-dana');
  }
  gotoLacak() {
    this.router.navigateByUrl('seller/lacak-barang-anda');
  }
  gotoInfoPengiriman() {
    this.router.navigateByUrl('seller/info-pengiriman');
  }
  gotoContact() {
    this.router.navigateByUrl('contact-us');
  }

}
