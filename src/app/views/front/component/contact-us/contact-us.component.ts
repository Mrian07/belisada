import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShareService } from '../../../../core/service/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  createComForm: FormGroup;
  name: FormControl;
  email: FormControl;
  issue: FormControl;
  message: FormControl;

  constructor(
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada.co.id');
    //this.fillForms.bind(this)
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('');
    this.email = new FormControl('');
    this.issue = new FormControl('');
    this.message = new FormControl('');
  }

  createForm() {
    this.createComForm = new FormGroup({
      name: this.name,
      email: this.email,
      issue: this.issue,
      message: this.message
    });
  }

  onSubmit() {
    const model = this.createComForm.value;
    const data = {
      name: model.name,
      email: model.email,
      issue: model.issue,
      message: model.message
    };

    this.shippingAddressService.create(data).subscribe(data => {

      if (data.status === '1') {
        swal(
          'success',
          data.message,
          'success'
        );
      }else {
        swal(
          'Opps!',
          data.message,
          'error'
        );
      }

    });

  }
}
