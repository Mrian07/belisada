import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { LoginService } from '../../../../../core/service/login/login.service';
import { ChatService } from '../../../../../core/service/chat/chat.service';
import { ProfileService } from '../../../../../core/service/profile/profile.service';

@Component({
  selector: 'app-m-menu-seller',
  templateUrl: './m-menu-seller.component.html',
  styleUrls: ['./m-menu-seller.component.scss']
})
export class MMenuSellerComponent implements OnInit {

  isOpen;
  isDisabled;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private chat: ChatService,
    private profileService: ProfileService
  ) { }

  user: any;
  userImgAvatar: string;
  fm: any = {};
  name: string;
  email: string;

  ngOnInit() {
    this.user = this.loginService.whoLogin();
    this.fillForms();
  }

  fillForms() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.profileService.getProfileBuyer(luser.token).subscribe(data => {

      this.userImgAvatar = data.imageAvatar ?'data:image/png;base64,' + data.imageAvatar : '/assets/img/kristy.png';
      this.name = data.name;
      this.email = data.email;
    });
  }

  logout() {

    swal({
      title: 'Alert',
      text: 'Apakah Anda akan keluar dari Account Area.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Iya'
    }).then((result) => {
      if (result.value) {
        this.loginService.logout();
        this.chat.disconnect();
        swal(
          'Success!',
          'Anda sudah keluar dari Account Area.',
          'success'
        ).then(()=> {
          this.router.navigateByUrl('/');
        });
      }
    });
  }
  goOngkir() {

  }
  goToProduct() {

  }
  gotoDana() {

  }
  gotoLacak() {

  }
  gotoContact() {

  }

  goDashboard() {
    this.router.navigateByUrl('/mobile-seller');
  }

  goBuyer() {
    this.router.navigateByUrl('/mobile/buyer');
  }

  editProfile() {
    this.router.navigate(['/mobile-seller/m-profile']);
  }

  goChangePassword() {
    this.router.navigateByUrl('/mobile-seller/m-change-password');
  }

  goRekening() {
    this.router.navigateByUrl('/mobile-seller/m-rekening');
  }

  goInfoToko() {
    this.router.navigateByUrl('/mobile-seller/m-toko');
  }


  goKontak() {
    this.router.navigate(['/mobile-seller/kontak']);
  }

  goPaymentInfo() {
    this.router.navigate(['/mobile-seller/payment-info']);
  }

  goSallesReport() {
    this.router.navigate(['/mobile-seller/salles-report']);
  }

  goFaqSeller() {
    this.router.navigate(['/mobile-seller/faq-seller']);
  }

  goAvatar() {
    this.router.navigateByUrl('/mobile-seller/m-avatar-seller');
  }

}
