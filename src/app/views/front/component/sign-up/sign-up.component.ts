import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterService } from '../../../../core/service/register/register.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  email: string;
  password: string;
  phone: string;
  name: string;
  password2: string;
  iscorporate = 'N';
  userType = '2';
  clickMessage = '';
  tc: string;
  loading: any;
  isReady: Boolean = false;


  constructor(
    private http: HttpClient,
    private categoryService: RegisterService,
    public modalService: SuiModalService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada Buyer - Registration');
  }

  popUp() {
    this.isReady = true;
  }

  register() {
    const registerData = {
      email : this.email,
      password : this.password,
      name : this.name,
      iscorporate: this.iscorporate,
      userType: this.userType,
      password2: this.password2
    };
    console.log(registerData.name);
    if (this.password !== this.password2) {
      swal(
        'Opps!',
        'password harus sama.',
        'error'
      );
      return false;
    }

    console.log(registerData);
    this.categoryService.register(registerData).subscribe(data => {
      // console.log('ini data', data);
      if (data.status === '1') {
        swal(
          'success',
          data.message,
          'success',
        ).then(()=> {
          location.reload();
          this.router.navigateByUrl('/login');
        });
      }else {
        swal(
          'Opps!',
          data.message,
          'error',

        );
      }
    });
  }

}
