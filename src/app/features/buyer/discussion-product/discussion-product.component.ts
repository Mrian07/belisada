import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { BuyerDiscus } from '../../../core/models/discus/discus.model';
import { DiscusService } from '@belisada/core/services/discus/discus.service';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-discussion-product',
  templateUrl: './discussion-product.component.html',
  styleUrls: ['./discussion-product.component.scss']
})
export class DiscussionProductComponent implements OnInit {
  storeImgDiscussion: string;

  buyerDiscus: BuyerDiscus  = new BuyerDiscus();

  currentPage: number;
  lastPage: number;
  pages: any = [];
  createComForm: FormGroup;

  constructor(
    private discusService: DiscusService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.storeImgDiscussion = environment.thumborUrl + 'unsafe/fit-in/45x45/center/filters:fill(fff)/';
  }

  ngOnInit() {
    this.createFormControls();
    this.loadData();
  }

  createFormControls() {
    this.createComForm = this.fb.group({
      discusParentId: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      productId: new FormControl('', Validators.required)
    });
  }

  loadData() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];

      const queryParams = {
        itemperpage: 10,
        page: this.currentPage,
        status: 'review'
      };

      this.discusService.getListBuyerDiscus(queryParams).subscribe(response => {
        this.buyerDiscus = response;

        this.createComForm.patchValue({
          message: null,
          discusParentId: response.content[0].discusId,
          productId: response.content[0].productId,
        });

          console.log('hasil', response);
      });

    });
  }

  detail(id, name) {
    this.router.navigate(['/product/product-detail/' + id + '/' + name]);
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
    return !this.createComForm.get(field).valid && this.createComForm.get(field).touched;
  }

  onSubmit() {

    const msg = this.createComForm.controls['message'].value;

console.log('apa', msg);

    if ( msg === null || msg === '') {
      swal(
        'Alert',
        'Silakan isi pesan Anda.',
        'error'
      );

      return;
    }
    if (this.createComForm.valid) {

      const data = {
        discusParentId: this.createComForm.controls['discusParentId'].value,
        productId: this.createComForm.controls['productId'].value,
        message: this.createComForm.controls['message'].value,
      };

      this.discusService.addBuyerDiscus(data).subscribe(respon => {
        console.log('hasil', respon);
        this.loadData();
      });

    } else {
      this.validateAllFormFields(this.createComForm);
    }

  }

}
