import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servers/service/login/login.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }
  user: Object;
  ngOnInit() {
    this.user = this.loginService.user;
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
        swal(
          'Success!',
          'Anda sudah keluar dari Account Area.',
          'success'
        ).then(()=> {
          this.router.navigate(['home']);
        });
      }
    });
  }

}
