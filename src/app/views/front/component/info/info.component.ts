import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  daftar() {
    // location.replace('/register');
    // location.replace('/sign-up');


    const luser = JSON.parse(localStorage.getItem('user'));
    if (luser) {
      if (luser.role === 1) {

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

      } else if (luser.role === 2 || luser.role === 3) {

        swal(
          'Info!',
          'Anda sudah terdaftar sebagai seller. Dan tidak perlu mendaftar kembali',
          'warning'
        );

      }
    }  else {
      this.router.navigateByUrl('/sign-up');
    }

  }
}

