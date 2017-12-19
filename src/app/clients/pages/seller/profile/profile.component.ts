import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    newImage: string;
    updateImg: Boolean = false;

    public uploader: FileUploader = new FileUploader({url: URL});
    public hasBaseDropZoneOver: Boolean = false;
    public hasAnotherDropZoneOver: Boolean = false;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
    constructor() { }

    ngOnInit() {
    }
    
	setCanvas(e) {
        if(!this.updateImg) return false;
        let cnv = document.createElement('canvas');
        let el = e.path[0];
        const w = el.width;
        const h = el.height;

		cnv.width = w;
		cnv.height = h;
        cnv.getContext('2d').drawImage(el, 0, 0, w, h);

        this.newImage = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ','+');
        console.log('newImg:', this.newImage);
	}

    setUrl(event, img) {
        let fr = new FileReader();
        let f = event.target.files[0];
        let that = this;

        if(!f.type.match(/image.*/)) return alert('Not valid image file');
        fr.onload = function() {
            that.updateImg = true;
            img.src = fr.result;
        }
        fr.readAsDataURL(f);
    }

}
