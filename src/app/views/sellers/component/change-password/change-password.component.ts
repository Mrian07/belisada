import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ChangePasswordService } from '../../../../core/service/changepassword/change-password.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  old_password: string;
  password_baru: string;
  password_ulangi: string;
  token: any;
  role: any;
  constructor(private changePasswordService: ChangePasswordService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Change Password');
    const user = JSON.parse(localStorage.user);
    this.token = user.token;
    this.role = user.role;
    this.old_password = '';
    this.getRole();
  }
  getRole() {
    // this.div.nativeElement.innerHTML ='';

    if (this.role === 6) {
       console.log('kampret3', this.role);
    } else {
       console.log('kampret', this.role);
    }
  }

  changePassword() {
    const changePasswordData = {
      oldPassword : this.old_password,
      newPassword : this.password_baru,
    };

    if (this.password_baru !== this.password_ulangi) {
      swal(
        'Opps!',
        'Ulangi password baru harus sama.',
        'error'
      );
      return false;
    }
    this.changePasswordService.ChangePassword(changePasswordData).subscribe(data => {
    });

  }

}
