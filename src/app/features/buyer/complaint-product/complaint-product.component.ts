import { Component, OnInit } from '@angular/core';
import { ComplaintService } from './../../../core/services/complaint/complaint.service';
import { ListIssu, ListIssuReq } from '@belisada/core/models/complaint/complaint.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-complaint-product',
  templateUrl: './complaint-product.component.html',
  styleUrls: ['./complaint-product.component.scss']
})
export class ComplaintProductComponent implements OnInit {

  listIssu: ListIssu[];
  listIssuSolution: ListIssu[];
  showForm: boolean;
  createComForm: FormGroup;

  updateImg: Boolean = false;
  base64Img: any;
  imageUrl: string;

  isSuccess: Boolean = false;

  constructor(
    private complaintService: ComplaintService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.dataIssu();
    this.idParam();
  }

  idParam() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.createComForm.patchValue(
        {
          orderNumber: params['id'],
        });
        if (params['id']) {
          this.showForm = true;
        } else {
          this.showForm = false;
        }

    });
  }

  dataIssu() {
    this.complaintService.getIssue().subscribe(respon => {
      this.listIssu = respon;
      this.complaintService.getIssueSolution().subscribe(respons => {
        this.listIssuSolution = respons;
      });
    });
  }

  createFormControls() {
    this.createComForm = this.fb.group({
      orderNumber: new FormControl('', Validators.required),
      orderRecieved: new FormControl('', Validators.required),
      orderComplainIssue: new FormControl('', Validators.required),
      orderComplainIssueSolution: new FormControl('', Validators.required),
      reasonOrderComplainIssueSolution: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const data: ListIssuReq = new ListIssuReq();
    if (this.base64Img) { data.image = this.base64Img; }
    data.orderNumber = this.createComForm.controls['orderNumber'].value;
    data.orderRecieved = this.createComForm.controls['orderRecieved'].value;
    data.orderComplainIssue = this.createComForm.controls['orderComplainIssue'].value;
    data.orderComplainIssueSolution = this.createComForm.controls['orderComplainIssueSolution'].value;
    data.reasonOrderComplainIssueSolution = this.createComForm.controls['reasonOrderComplainIssueSolution'].value;

    if (this.createComForm.controls['orderRecieved'].value === '') {
      swal(
        'Gagal',
        'Silakan pilih masalah apa yang anda terima.',
        'error'
      );
    } else if (this.createComForm.controls['orderComplainIssue'].value === '') {
      swal(
        'Gagal',
        'Silakan pilih solusi yang anda inginkan.',
        'error'
      );
    } else {
      this.complaintService.create(data).subscribe(respons => {
        if (respons.status === 1) {
          this.isSuccess = true;
          this.showForm = false;
        } else if (respons.status === 3) {
          swal(
            'Gagal',
            'Maaf Anda tidak di izinkan melakukan komplain lebih dari satu kali dengan ID yang sama.',
            'error'
          );
        } else if (respons.status === 0) {
          swal(
            'Gagal',
            'Maaf komplain gagal terkirim silakan dicoba kembali.',
            'error'
          );
        }
      });
    }

  }

  backToOrder() {
    this.router.navigateByUrl('/buyer/order');
  }

  setUrl(event, img) {
    // consol
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;
    // this.onViewDesc = false;
    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      that.base64Img = fr.result;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

}
