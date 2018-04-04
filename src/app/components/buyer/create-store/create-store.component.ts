import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
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
  isNewProduct: Boolean = true;
  productPictures: any[] = [];
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
  getSelectedFiles(event: any) {
    const files = [].slice.call(event.target.files);
    this.readThis(files);
  }
  readThis(files: any[]): void {
    files.forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        if (this.productPictures.length < 5) {
          this.productPictures.push(myReader.result);
        } else {
          swal(
            'Belisada.co.id',
            'Kamu hanya bisa menambahkan maksimal 5 gambar',
            'info'
          );
        }
        console.log('this.productPictures: ', this.productPictures);
      };
      myReader.readAsDataURL(file);
    });
  }
}
