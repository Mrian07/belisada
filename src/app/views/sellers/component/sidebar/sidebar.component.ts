import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import { ActiveLink, ShareService } from '../../../../core/service/shared.service';
import { TokenService } from '../../../../core/service/token/token.service';
import { StoreService } from '../../../../core/service/store/store.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { FlagService } from '../../../../core/service/flag.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  pathArray: any;
  activeLink: any;
  eCheckDisabled: any;
  eCheckReadonly: any;

  message: string;

  constructor(private router: Router,
  private profileService: ProfileService,
  private active: ActiveLink,
  private sharedService: ShareService,
  private tokenService: TokenService,
  private storeService: StoreService,
  private translate: TranslateService,
  private flagService: FlagService
) {  }


  ngOnInit() {
    this.getProfile();
    this.getUri();
    this.getStoreStatus();
    this.lang = localStorage.getItem('language');
    if (this.lang) {
      this.translate.use(this.lang);
    }

    this.uploadPhoto();
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
