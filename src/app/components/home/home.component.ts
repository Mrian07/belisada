import { LocalStorageEnum } from './../../core/enum/local-storage.enum';
import { UserData } from './../../core/services/user/models/user';
import { UserService } from './../../core/services/user/user.service';
import swal from 'sweetalert2';
import { Province, City, District, Village } from './../../core/services/store/models/address';
import { StoreService } from './../../core/services/store/store.service';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public validationOnpopUpCreateStore: FormGroup;
  provinces: Province[];
  nmPemilikToko: FormControl;
  serverMessage: String;
  fm: any = {};
  cities: City[];
  curentPostal: any ;
  districts: District[];
  userData: UserData = new UserData();
  villages:  Village[];
  isLogin: Boolean = false;
  constructor(private fb: FormBuilder,  private storeService: StoreService, private userS: UserService) { }

  ngOnInit() {


    this.validationOnpopUpCreateStore = this.fb.group({
      nmPemilikToko: new FormControl (null, Validators.required),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      email: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
  ]),
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      villageId: new FormControl(null,
        Validators.required,
      ),
      postal: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)

    ]),
      description: new FormControl(null, Validators.required)
    });
    this.userData = this.userS.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    if (this.userData) { this.isLogin = true; }
    this.getProvince();
    this.onChanges();
  }
  testingform(form: NgForm) {
    console.log(form);
  }
  onChanges() {

    this.validationOnpopUpCreateStore.get('province').valueChanges.subscribe(val => {
      this.getCity(val);
    });
    this.validationOnpopUpCreateStore.get('city').valueChanges.subscribe(val => {
      this.getDistrict(val);
    });

    this.validationOnpopUpCreateStore.get('district').valueChanges.subscribe(val => {
      this.getVillage(val);
    });
    this.validationOnpopUpCreateStore.get('district').valueChanges.subscribe(val => {
    });
  }
  getProvince() {
    // Country ID harcoded to Indonesia
    this.storeService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }

  getCity(id) {
    this.storeService.getCity(id).subscribe(data => {
      this.cities = data;
      console.log('data city', data );
    });
  }
  getDistrict(id) {
    this.storeService.getDistrict(id).subscribe(data => {
      this.districts = data;
      console.log('data district', data);
    });
  }

  getVillage(id) {
    this.storeService.getVillage(id).subscribe(data => {
      this.villages = data;
      const model = this.validationOnpopUpCreateStore.value;
     const a =  this.validationOnpopUpCreateStore.value.villageId = id.district;
      console.log('data vilages', data);
    });
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  isFieldValid(field: string) {
    return !this.validationOnpopUpCreateStore.get(field).valid && this.validationOnpopUpCreateStore.get(field).touched;
  }
  onSent() {
    if (this.validationOnpopUpCreateStore.valid) {


      const model = this.validationOnpopUpCreateStore.value;

      this.userS.createFormGuest(model).subscribe(rsl => {
      if (rsl.status === 1) {
        swal(rsl.message);
        // swal
      } else {
        swal(rsl.message);
      }
      });
    } else {
      swal('ops maaf ada kesalahan');
      this.validateAllFormFields(this.validationOnpopUpCreateStore);
    }
  }

  setVilage(villageId) {
    console.log('option', villageId);
    const postalId: string = this.villages.find(x => x.villageId === villageId).postal;
    console.log('postalId: ', postalId);
    this.validationOnpopUpCreateStore.patchValue({
      postal: postalId
    });
  }
   /*
    validasi jika tidak ingin menggunakan huruf only angka
   */
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
}

}
