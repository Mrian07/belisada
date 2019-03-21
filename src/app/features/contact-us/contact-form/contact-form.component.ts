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
  public contactForm: FormGroup;
  name: FormControl;
  email: FormControl;
  message: FormControl;
  constructor(
    private fb: FormBuilder,
    // private contactusservice: ContactUsService,
    private contactUsService: ContactUsService
  ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
    email: [null, Validators.required, Validators.email],
    message: [null, [Validators.required]],
    name: [null, [Validators.required]]
    });
  }
  onSubmit() {
    const contactusmodel: ContactUsModel = new ContactUsModel;
    contactusmodel.name = this.contactForm.controls['email'].value;
    contactusmodel.name = this.contactForm.controls['message'].value;
    contactusmodel.name = this.contactForm.controls['name'].value;
    console.log('contact us model:', contactusmodel);

    return;

    this.contactUsService.insert(contactusmodel).subscribe(data => {
      console.log(data);
    });
  }
}
