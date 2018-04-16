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
  cities: City[];
  districts: District[];
  userData: UserData = new UserData();
  villages: Village[];
  isLogin: Boolean = false;
  constructor(private fb: FormBuilder,  private storeService: StoreService, private userS: UserService) { }

  ngOnInit() {


    this.validationOnpopUpCreateStore = this.fb.group({
      nmPemilikToko: new FormControl (null, Validators.required),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      villageId: new FormControl(null, Validators.required),
      postal: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
    this.userData = this.userS.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    if (this.userData) { this.isLogin = true; }
    this.getProvince();
    this.onChanges();
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
    });
  }
  getDistrict(id) {
    this.storeService.getDistrict(id).subscribe(data => {
      this.districts = data;
    });
  }

  getVillage(id) {
    this.storeService.getVillage(id).subscribe(data => {
      this.villages = data;
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
  onSent(form:NgForm) {
    if (this.validationOnpopUpCreateStore.valid) {


      const model = this.validationOnpopUpCreateStore.value;

      this.userS.createFormGuest(model).subscribe(rsl => {
        swal({
          title: 'Auto close in 5 second!',
          text: 'Selamat Anda Berhasil Membuat Toko',
          timer: 5000,
          onOpen: () => {
            swal.showLoading()
          }
        }).then((result) => {
          if (
            // Read more about handling dismissals
            result.dismiss === swal.DismissReason.timer
          ) {
            window.location.reload();
          }
        })
      });
    } else {
      console.log('asd')
      this.validateAllFormFields(this.validationOnpopUpCreateStore);
    }
  //   if (this.validationOnpopUpCreateStore.valid) {
  //   const model = this.validationOnpopUpCreateStore.value;
  //   this.userS.createFormGuest(model).subscribe(rsl => {
  //     swal({
  //       title: 'Auto close in 5 second!',
  //       text: 'Selamat Anda Berhasil Membuat Toko & Account',
  //       timer: 5000,
  //       onOpen: () => {
  //         swal.showLoading()
  //       }
  //     }).then((result) => {
  //       if (
  //         // Read more about handling dismissals
  //         result.dismiss === swal.DismissReason.timer
  //       ) {
  //         window.location.reload();
  //       }
  //     })
  //   });
  // }  else {
  //   this.validateAllFormFields(this.validationOnpopUpCreateStore);
  // }

  }

}
