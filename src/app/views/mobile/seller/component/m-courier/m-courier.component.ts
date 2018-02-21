import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../../core/service/profile/profile.service';
import { ActiveLink, ShareService } from '../../../../../core/service/shared.service';
import { TokenService } from '../../../../../core/service/token/token.service';
import { StoreService } from '../../../../../core/service/store/store.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { FlagService } from '../../../../../core/service/flag.service';
import { CourierService } from '../../../../../core/service/courier/courier.service';
import { Courier } from '../../../../../core/model/courier';

export class Option {
  name: any;
  value: number;
  checked: Boolean;
}


@Component({
  selector: 'app-m-courier',
  templateUrl: './m-courier.component.html',
  styleUrls: ['./m-courier.component.scss']
})
export class MCourierComponent implements OnInit {

  updateImg: Boolean = false;
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

  fm: any = {};
  userImgAvatar: string;

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
    this.fillForms();
  }


  fillForms() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.profileService.getProfileBuyer(luser.token).subscribe(data => {

      // console.log('ini data: ', data);

      this.fm = {
        name : data.name,
        address: data.address,
        postal: data.postal,
        npwp : data.npwp,
        phone : data.phone,
        idcard: data.idcard,
        villageId: data.villageId,
      }

      this.userImgAvatar = data.imageAvatar ?'data:image/png;base64,' + data.imageAvatar : '/assets/img/kristy.png';
      const sharedData = {
        image: this.userImgAvatar,
        name: this.fm.name,
        email: this.fm.email
      };
    });
  }

  setCanvas(e, newIMG) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[newIMG] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');

    this.profileService.updatebuyerProfile(this.fm).subscribe(data => {

      if (data.status === '1') {
        swal(
          'Success',
          'Upload Photo berhasil',
          'success'
        )
      }else {
        swal(
          'Opps!',
          data.message,
          'error'
        );
      }

    });

    this.flagService.changeMessage('upload-photo');
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
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
