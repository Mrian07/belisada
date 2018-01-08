import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterService } from '../../../../core/service/register/register.service';
import { Title } from '@angular/platform-browser';
export interface IContext {
  data: string;
}

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  phone: string;
  name: string;
  password2: string;
  iscorporate = 'N';
  userType = '1';
  clickMessage = '';
  tc: string;
  loading: any;

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  public open(dynamicContent: string = 'Example') {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = 'closed!';
    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(result => { /* approve callback */ })
        .onDeny(result => { /* deny callback */});
}
  constructor(private http: HttpClient,
    private categoryService: RegisterService,
    public modalService: SuiModalService,
    private router: Router,
    private title: Title
  ) {  }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Registration');
  }
  popUp() {
    swal(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum odio tortor,' +
    'semper ut finibus in, feugiat a felis. Mauris congue augue ac sem euismod, commodo' +
    'malesuada odio ultricies. Quisque vitae enim vitae ex fringilla ullamcorper. In sollicitudin, lorem' +
    'id lacinia consectetur, mauris quam tempor sem, vitae interdum leo dolor quis nibh' +
    'Cras quis mi consectetur, facilisis orci ac, ultrices dui. Ut convallis molestie finibus. In hac habitasse platea dict' +
    'umst. Donec quis lacus sagittis, lacinia sapien id, feugiat justo. Cras scelerisque ipsum quis efficitur eleifend.');
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
