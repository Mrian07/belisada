import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { CreateStoreRequest, CheckStoreRequest } from '@belisada/core/models/store/store.model';
import { Province, City, District, Village } from '@belisada/core/models/store/address';
import { StoreService, UserService, ShareMessageService } from '@belisada/core/services';

@Component({
selector: 'app-create-store',
templateUrl: './create-store.component.html',
// styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {
  fileToUpload: File = null;
  store: FormGroup;
  storeName: FormControl;
  description: FormControl;
  storePictures: any[] = [];
  nameChecking: Boolean = false;
  pending_submit: Boolean = false;
  picture: FormControl;
  data: CreateStoreRequest = new CreateStoreRequest;
  timer: any;
  updateImg: any;
  fm: any = {};
  provinces: Province[];
  serverMessage: String;
  cities: City[];
  adr: any = {};
  districts: District[];
  villages: Village[];
  storeUrl: FormControl;
  private formSumitAttempt: boolean;
  constructor(private fb: FormBuilder, private storeService: StoreService, private profileS: UserService,
    private shareMessageService: ShareMessageService) {}

  ngOnInit() {
    this.shareMessageService.changeMessage('create-store');
    this.storeName = new FormControl(null, Validators.required);
    this.storeUrl = new FormControl(null, Validators.required);
    this.store = this.fb.group({
      name: this.storeName,
      address: new FormControl(null, Validators.required),
      storeUrl: this.storeUrl,
      description: new FormControl(null, Validators.required),
      storePicture: new FormControl(),
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      villageId: new FormControl(null, Validators.required),
      postal: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)

      ]),

    });

    this.getProvince();
    this.onChanges();
    // this.getCity();
  }

  onChanges() {
    // this.store.controls['storeUrl'].disable();
    this.storeName.valueChanges.subscribe(val => {
      clearTimeout(this.timer);
      if (val.length > 0) {
        this.timer = setTimeout(() => {
          this.nameChecking = true;
          this.checkStoreName();
        }, 500);
      }
    });
    this.store.get('province').valueChanges.subscribe(val => {
      this.getCity(val);
    });
    this.store.get('city').valueChanges.subscribe(val => {
      this.getDistrict(val);
    });

    this.store.get('district').valueChanges.subscribe(val => {
      this.getVillage(val);
    });
    this.store.get('district').valueChanges.subscribe(val => {});
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
      const model = this.store.value;
      const a = this.store.value.villageId = id.district;
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  checkStoreName() {
    const check_data: CheckStoreRequest = new CheckStoreRequest;
    check_data.name = this.storeName.value;
    this.storeService.isExist(check_data).subscribe(rsl => {
      if (rsl.status !== 1) {
        this.storeName.setErrors({
          'server': true
        });
        this.serverMessage = rsl.message;
      }
      this.nameChecking = false;
      if (this.pending_submit) {
        this.onSent();
        this.pending_submit = false;
      }
    }, err => {
      this.nameChecking = false;
      this.storeName.setErrors({
        'server': true
      });
      this.serverMessage = 'opps, please try again';
    });
  }
  setVilage(villageId) {
    const postalId: string = this.villages.find(x => x.villageId === villageId).postal;
    this.store.patchValue({
      postal: postalId
    });
  }


  setCanvas(e, newIMG) {
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[newIMG] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
  }


  getSelectedFiles(event: any) {
    const files = [].slice.call(event.target.files);
    this.readThis(files);
  }

  readThis(files: any[]): void {
    if (files.length <= 0) {
      alert('masukan foto');
      return;
    }
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.data.picture = myReader.result;
    };
    myReader.readAsDataURL(files[0]);
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) {
      return alert('Not valid image file');
    }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

  removeImage() {
    this.data.picture = undefined;
    this.store.patchValue({
      storePicture: ''
    });
    // if (index > -1) {
    //   this.storePictures.splice(index, 1);
    // }
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
    return !this.store.get(field).valid && this.store.get(field).touched;
  }
  onSent() {
    if (this.store.valid) {
      if (this.nameChecking) {
        this.pending_submit = true;
        return false;
      }

      const model = this.store.value;
      model.storePicture = this.data.picture;
      // model.storeUrl = this.asd;
      // console.log('storeUrl : ', this.asd);


      this.storeService.create(model).subscribe(rsl => {
        if (rsl.status === 1) {
          swal({
            title: 'Pembuatan Toko Berhasil',
            // text: rsl.message,
            type: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              location.reload();
            }
          });
        } else {
          swal(rsl.message);
        }
      });
    } else {
      swal('Ops Silahkan Cek data kamu kembali');
      this.validateAllFormFields(this.store);
    }

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKey(event: any) {
    const pattern = /[\\]+/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  onNameKeydown(event: any) {
    const pattern = /[a-zA-Z 0-9\+\- ]+/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
    this.store.get('name').valueChanges.subscribe(val => {
      val = val.replace(/\s+/g, '_').toLowerCase();
      this.store.patchValue({
        storeUrl: val
      });
    });
  }
}
