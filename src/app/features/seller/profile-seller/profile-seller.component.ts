import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-seller',
  templateUrl: './profile-seller.component.html',
  styleUrls: ['./profile-seller.component.scss']
})
export class ProfileSellerComponent implements OnInit {

  isEdit: boolean;
  createComForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.isEdit = false;
    this.createFormControls();
  }

  /* Fungsi ini untuk membuat nama form */
  createFormControls() {
    this.createComForm = this.fb.group({
      address: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      villageId: ['', Validators.required]
    });
  }

  editStore() {
    this.isEdit = true;
  }

}
