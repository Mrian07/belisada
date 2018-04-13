import { Village } from './../../../core/services/store/models/vilage';
import { District } from './../../../core/services/store/models/district';
import { UserService } from './../../../core/services/user/user.service';
import { City } from './../../../core/services/store/models/city';
import { Province } from './../../../core/services/store/models/province';
import { StoreService } from './../../../core/services/store/store.service';
import { CreateStoreRequest, CheckStoreRequest, CheckStoreResponse } from './../../../core/services/store/models/store.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-create-store',
    templateUrl: './create-store.component.html',
    // styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {
  fileToUpload: File = null;
  store: FormGroup;
  storeName: FormControl;
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

  constructor(private fb: FormBuilder, private storeService: StoreService, private profileS: UserService) {}

  ngOnInit() {
    this.storeName = new FormControl(null, Validators.required);

    this.store = this.fb.group({
      name: this.storeName,
      address: new FormControl(null, Validators.required),
      description: new FormControl(),
      storePicture: new FormControl(),
      province: new FormControl(),
      city: new FormControl(),
      district: new FormControl(),
      villageId: new FormControl(),
      postal: new FormControl()

    });

    this.getProvince();
    this.onChanges();
    // this.getCity();
  }

  onChanges() {
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
      console.log('val1 : ', val);
    });

    this.store.get('district').valueChanges.subscribe(val => {
      this.getVillage(val);
      console.log('val village : ', val);
    });
  }
  getProvince() {
    // Country ID harcoded to Indonesia
    this.storeService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }

  getCity(id) {
    console.log(id);
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
      console.log('vilage : ', this.villages);
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
    let files = [].slice.call(event.target.files);
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

  removeImage(index: number) {
    if (index > -1) {
      this.storePictures.splice(index, 1);
    }
  }
  onSent() {
    if (this.nameChecking) {
      this.pending_submit = true;
      return false;
    }

    const model = this.store.value;
    model.storePicture = this.data.picture;

    this.storeService.create(model).subscribe(rsl => {});

  }
}
