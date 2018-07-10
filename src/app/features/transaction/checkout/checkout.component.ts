import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public formAddCrtl: FormGroup;
  showDialogPilihAlamat: Boolean = false;

  simpan_sebagai: FormControl;
  penerima: FormControl;
  hp: FormControl;
  kodepos: FormControl;
  provinsi: FormControl;
  kota: FormControl;
  kecamatan: FormControl;
  kelurahan: FormControl;
  alamat: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formAdd();
  }

  formAdd() {
      this.formAddCrtl = this.fb.group({
        simpan_sebagai: new FormControl(null, Validators.required),
        penerima: new FormControl(null, Validators.required),
        hp: new FormControl(null, Validators.required),
        kodepos: new FormControl(null, Validators.required),
        provinsi: new FormControl(null, Validators.required),
        kota: new FormControl(null, Validators.required),
        kecamatan: new FormControl(null, Validators.required),
        kelurahan: new FormControl(null, Validators.required),
        alamat: new FormControl(null, Validators.required),
    });
  }


}
