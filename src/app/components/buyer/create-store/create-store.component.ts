import { StoreService } from './../../../core/services/store/store.service';
import { CreateStoreRequest } from './../../../core/services/store/models/store.model';
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
  storePictures: any[] = [];

  constructor(private fb: FormBuilder, private storeService: StoreService) { }

  ngOnInit() {
    this.store = this.fb.group({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      description: new FormControl()
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSent() {
    let data: CreateStoreRequest = new CreateStoreRequest;
    data = this.store.value;
    this.storeService.create(data).subscribe(rsl => {
      console.log('rsl:', rsl);
    });
    // console.log('submit:', this.store);
  }

  getSelectedFiles(event: any) {
    const files = [].slice.call(event.target.files);
    this.readThis(files);
  }

  readThis(files: any[]): void {
    files.forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        if (this.storePictures.length < 5) {
          this.storePictures.push(myReader.result);
        } else {
          swal(
            'Belisada.co.id',
            'Kamu hanya bisa menambahkan maksimal 5 gambar',
            'info'
          );
        }
        console.log('this.productPictures: ', this.storePictures);
      };
      myReader.readAsDataURL(file);
    });
  }
}
