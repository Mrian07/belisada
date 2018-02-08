import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { LoginService } from '../../../../core/service/login/login.service';
import { ChatService } from '../../../../core/service/chat/chat.service';
import { FlagService } from '../../../../core/service/flag.service';

@Component({
  selector: 'app-header-buyer',
  templateUrl: './header-buyer.component.html',
  styleUrls: ['./header-buyer.component.scss']
})
export class HeaderBuyerComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private chat: ChatService, private flagService: FlagService) { }
  user: any;
  ngOnInit() {
    this.user = this.loginService.whoLogin();
    console.log('loged user:', this.user);
  }

  logout() {
    // alert('logout');
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
          this.flagService.changeMessage('logout');
          this.router.navigateByUrl('/');
        });
      }
    });
  }

  profileBuyer() {
    this.router.navigateByUrl('/buyer/profile-buyer');
  }

  changePassword() {
    this.router.navigateByUrl('/buyer/change-password');
  }

  billingAddress() {
    this.router.navigateByUrl('/buyer/billingAddress');
  }

  shippingAddress() {
    this.router.navigateByUrl('/buyer/shippingAddress');
  }

  transactionBuyer() {
    this.router.navigateByUrl('/buyer/transaction-buyer');
  }

  goDashboard() {
    this.router.navigateByUrl('/buyer/dashboard');
  }

  goSeller() {
    this.router.navigateByUrl('/buyer');
    const user = JSON.parse(localStorage.user);
    if (user.role === 3 || user.role === 2) {
      this.router.navigateByUrl('/seller/dashboard');
    } else {

      swal({
        title: 'Warning',
        text: 'Anda belum menjadi Seller. Apakah Anda ingin mendaftar sebagai Seller?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1d7d0a',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Daftar Sebagai Seller'
      }).then((result) => {
        if (result.value) {
            this.router.navigateByUrl('/buyer/seller-propose');
        } else {
            return false;
        }
      });

   }

  }

  goWishlist() {
    this.router.navigateByUrl('/buyer/wishlist-buyer');
  }

  goInbox() {
    this.router.navigateByUrl('/buyer/inbox-buyer');
  }

}
