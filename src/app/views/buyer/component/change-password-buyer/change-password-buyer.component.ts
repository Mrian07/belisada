import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password-buyer',
  templateUrl: './change-password-buyer.component.html',
  styleUrls: ['./change-password-buyer.component.scss']
})
export class ChangePasswordBuyerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import swal from 'sweetalert2';
// import { ChangePasswordService } from '../../../../core/service/changepassword/change-password.service';
// import { Title } from '@angular/platform-browser';

// @Component({
//   selector: 'app-change-password-buyer',
//   templateUrl: './change-password-buyer.component.html',
//   styleUrls: ['./change-password-buyer.component.scss']
// })
// export class ChangePasswordBuyerComponent implements OnInit {

//   old_password: string;
//   password_baru: string;
//   password_ulangi: string;
//   token: any;
//   role: any;
//   constructor(private changePasswordService: ChangePasswordService,
//     private title: Title
//   ) { }

//   ngOnInit() {
//     this.title.setTitle('Belisada Seller - Change Password');
//     const user = JSON.parse(localStorage.user);
//     this.token = user.token;
//     this.role = user.role;
//     this.old_password = '';
//     this.getRole();
//   }

//   getRole() {
//     if (this.role === 6) {
//        console.log('kampret3', this.role);
//     } else {
//        console.log('kampret', this.role);
//     }
//   }

//   changePassword() {
//     const changePasswordData = {
//       oldPassword : this.old_password,
//       newPassword : this.password_baru,
//     };

//     if (this.password_baru !== this.password_ulangi) {
//       swal(
//         'Opps!',
//         'Ulangi password baru harus sama.',
//         'error'
//       );
//       return false;
//     }
//     this.changePasswordService.ChangePassword(changePasswordData).subscribe(data => {
//     });

//   }

// }
