import { Bidang } from './../../../../core/model/bidang';
import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/service/master/master.service';
import { CategoryService } from '../../../../core/service/category/category.service';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { InfoPerusahaanService } from '../../../../core/service/perusahaan/info-perusahaan.service';
@Component({
  selector: 'app-info-perusahaan',
  templateUrl: './info-perusahaan.component.html',
  styleUrls: ['./info-perusahaan.component.scss']
})
export class InfoPerusahaanComponent implements OnInit {
  private user = JSON.parse(localStorage.user);
  createComForm: FormGroup;
  province: FormControl;
  city: FormControl;
  district: FormControl;
  village: FormControl;
  siup: FormControl;
  tdp: FormControl;
  newImage: string;

  corporateName: FormControl;
  address: FormControl;
  corporatePhone: FormControl;
  postalCode: FormControl;
  sectorTypeId: FormControl;
  corporateNpwp: FormControl;
  selectedCategory: any;
  // sectorTypeId: FormControl;
  imageCorporateNpwp: FormControl;
  updateImg: Boolean = false;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];
  status: string;
  message: string;

  kelurahan = [];
  bidang: Bidang[];
  categories = [];
  selectedProvince: string;

  constructor(private masterService: MasterService, private categoryService: CategoryService,
    private infoPerusahaan: InfoPerusahaanService) { }

  ngOnInit() {
    // this.getProvince();
    this.getCategoryOne();
    this.createFormControls();
    this.createForm();
    this.getProvince();
  }

  setCanvas(e) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.path[0];
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.newImage = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
    console.log('newImg:', this.newImage);
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

  setCanvasNpwp(e) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.path[0];
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.newImage = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
    console.log('newImg:', this.newImage);
  }

  onSubmit() {
    const model = this.createComForm.value;
    const data = {
      corporateName: model.corporateName,
      address: model.address,
      corporatePhone: model.corporatePhone,
      postal: model.postalCode,
      villageId: model.village.mvillageId,
      siup: model.siup,
      tdp: model.tdp,
      // this.selectedCategory.mbankId
      sectorTypeId: model.sectorTypeId.sectorTypeId,
      corporateNpwp: model.corporateNpwp,
      imageCorporateNpwp: this.newImage
    };
    this.infoPerusahaan.update(data).subscribe(response => {
      console.log('ini submit ', response);
      this.createComForm.reset();
      if (response.status === '1') {
        swal(
          'success',
          response.message,
          'success'
        );
      }else {
        swal(
          'Opps!',
          response.message,
          'error'
        );
      }
      // this.getAllStore();
    });
  }
  setUrlNpwp(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

  // getProvince() {
  //   this.masterService.getProvince('209').subscribe(data => {
  //     this.province = data;
  //   });
  // }

  // selectCity(id) {
  //   this.masterService.getCity(id).subscribe(data => {
  //     this.city = data;
  //   });
  // }

  // selectKelurahan(id) {
  //   this.masterService.getDistrict(id).subscribe(data => {
  //     this.kelurahan = data;
  //   });
  // }

  getCategoryOne() {
    this.categoryService.test().subscribe(data => {
      this.bidang = data;
    });
  }
  selectCategories(sectorTypeId: number) {
    console.log(sectorTypeId);
  }


  createFormControls() {
    this.corporateName = new FormControl('');
    this.address = new FormControl('');
    this.province = new FormControl('');
    this.city = new FormControl('');
    this.district = new FormControl('');
    this.village = new FormControl('');
    this.corporatePhone = new FormControl('');
    this.siup = new FormControl('');
    this.postalCode = new FormControl('');
    this.sectorTypeId = new FormControl('');
    this.tdp = new FormControl('');
    this.corporateNpwp = new FormControl('');
    this.sectorTypeId = new FormControl('');
    this.imageCorporateNpwp = new FormControl('');

  }

  createForm() {
    this.createComForm = new FormGroup({
      corporateName: this.corporateName,
      address: this.address,
      province: this.province,
      city: this.city,
      district: this.district,
      village: this.village,
      corporatePhone: this.corporatePhone,
      postalCode: this.postalCode,
      siup: this.siup,
      tdp: this.tdp,
      corporateNpwp: this.corporateNpwp,
      sectorTypeId: this.sectorTypeId,
      imageCorporateNpwp: this.imageCorporateNpwp
    });
  }
  getProvince() {
    // Country ID harcoded to Indonesia
    this.masterService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }

  getCity(id) {
    console.log(id);
    this.masterService.getCity(id).subscribe(data => {
      this.cities = data;
    });
  }

  getDistrict(id) {
    this.masterService.getDistrict(id).subscribe(data => {
      this.districts = data;
    });
  }

  getVillage(id) {
    this.masterService.getVillage(id).subscribe(data => {
      this.villages = data;
    });
  }

  setPostalCode(postalcode) {
    this.createComForm.controls['postalCode'].setValue(postalcode);
  }

}
