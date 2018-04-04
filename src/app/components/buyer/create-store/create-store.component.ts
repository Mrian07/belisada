import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {
  fileToUpload: File = null;
  public storeFgroup: FormGroup;
  toko: FormControl;
  alamat: FormControl;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.storeFgroup = this.fb.group({
      toko: new FormControl(null, Validators.required),
      alamat: new FormControl(null, Validators.required)
    });
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onSent() {
    console.log('asd');
  }
}
