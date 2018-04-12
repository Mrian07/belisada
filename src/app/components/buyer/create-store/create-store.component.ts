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
    data: CreateStoreRequest = new CreateStoreRequest;
    timer: any;
    serverMessage: String;

    constructor(private fb: FormBuilder, private storeService: StoreService) { }

    ngOnInit() {
        this.storeName = new FormControl(null, Validators.required);

        this.store = this.fb.group({
        name: this.storeName,
        address: new FormControl(null, Validators.required),
        description: new FormControl()
        });

        this.storeName.valueChanges.subscribe(val => {
        clearTimeout(this.timer);
        if (val.length > 0) {
            this.timer = setTimeout(() => {
            this.nameChecking = true;
            this.checkStoreName();
            }, 500);
        }
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
            this.storeName.setErrors({'server': true});
            this.serverMessage = rsl.message;
        }
        this.nameChecking = false;
        if (this.pending_submit) {
            this.onSent();
            this.pending_submit = false;
        }
        }, err => {
        this.nameChecking = false;
        this.storeName.setErrors({'server': true});
        this.serverMessage = 'opps, please try again';
        });
    }

    onSent() {
        if (this.nameChecking) {
        this.pending_submit = true;
        return false;
        }

        this.data = this.store.value;

        this.storeService.create(this.data).subscribe(rsl => {
        console.log('rsl:', rsl);
        });
    }

    getSelectedFiles(event: any) {
        const files = [].slice.call(event.target.files);
        this.readThis(files);
    }

    readThis(files: any[]): void {
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
        this.data.picture = myReader.result;
        console.log('this.productPictures: ', this.storePictures);
        };
        myReader.readAsDataURL(files[0]);
    }
    removeImage(index: number) {
        if (index > -1) {
        this.storePictures.splice(index, 1);
        }
    }
}
