import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ChangePasswordService } from '../../../../core/service/changepassword/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  old_password: string;
  password_baru: string;
  password_ulangi: string;

  constructor(private changePasswordService: ChangePasswordService) { }

  ngOnInit() {
    this.old_password = '';
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
