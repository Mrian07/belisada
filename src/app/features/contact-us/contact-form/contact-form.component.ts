import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ContactUsModel } from '@belisada/core/models';
// import { ContactUsService } from '@belisada/core/services';
import swal from 'sweetalert2';
import { ContactUsService } from '@belisada/core/services';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contactUsService: ContactUsService
  ) {
    this.contactForm = this.fb.group({
      email: [null, Validators.required, Validators.email],
      message: [null, [Validators.required]],
      name: [null, [Validators.required]]
      });
  }

  ngOnInit() {

  }
  onSubmit() {
    if (this.contactForm.valid) {
      const contactusmodel: ContactUsModel = new ContactUsModel;
      contactusmodel.name = this.contactForm.controls['name'].value;
      contactusmodel.email = this.contactForm.controls['email'].value;
      contactusmodel.message = this.contactForm.controls['message'].value;

      this.contactUsService.insert(contactusmodel).subscribe(data => {
        // if (data[0].status === 1) {

        // }
        console.log(data);
      });
    }
  }
}
