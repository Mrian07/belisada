import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../../../core/service/token/token.service';
import { ProfileService } from '../../../../../core/service/profile/profile.service';
import swal from 'sweetalert2';
import { FlagService } from '../../../../../core/service/flag.service';

@Component({
  selector: 'app-m-avatar-seller',
  templateUrl: './m-avatar-seller.component.html',
  styleUrls: ['./m-avatar-seller.component.scss']
})
export class MAvatarSellerComponent implements OnInit {

  updateImg: Boolean = false;
  
    imgTop: any;

    buyerName: string;
    buyerEmail: string;
    buyerImage: string;
    lang: any;

    message: string;

    fm: any = {};
    userImgAvatar: string;

    constructor(
      private router: Router,
      private profileService: ProfileService,
      private tokenService: TokenService,
      private flagService: FlagService
    ) { }

    ngOnInit() {
      this.lang = localStorage.getItem('languange');
      this.getProfileBuyer();
      this.uploadPhoto();
      this.fillForms();
    }

    fillForms() {
      const luser = JSON.parse(localStorage.getItem('user'));
      this.profileService.getProfileBuyer(luser.token).subscribe(data => {

        this.fm = {
          name : data.name,
          address: data.address,
          postal: data.postal,
          npwp : data.npwp,
          phone : data.phone,
          idcard: data.idcard,
          villageId: data.villageId,
        }

        this.userImgAvatar = data.imageAvatar ?'data:image/png;base64,' + data.imageAvatar : '/assets/img/kristy.png';
        const sharedData = {
          image: this.userImgAvatar,
          name: this.fm.name,
          email: this.fm.email
        };
      });
    }

    setCanvas(e, newIMG) {
      if (!this.updateImg) { return false; }
      const cnv = document.createElement('canvas');
      const el = e.target;
      const w = el.width;
      const h = el.height;

      cnv.width = w;
      cnv.height = h;
      cnv.getContext('2d').drawImage(el, 0, 0, w, h);

      this.fm[newIMG] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');

      this.profileService.updatebuyerProfile(this.fm).subscribe(data => {

        if (data.status === '1') {
          swal(
            'Success',
            'Upload Photo berhasil',
            'success'
          );
        }else {
          swal(
            'Opps!',
            data.message,
            'error'
          );
        }

      });

      this.flagService.changeMessage('upload-photo');
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
    uploadPhoto() {
      this.flagService.currentMessage.subscribe(respon => {
        this.message = respon;
        if (this.message === 'upload-photo') {
          this.getProfileBuyer();
        }
      });
    }

    getProfileBuyer() {
      this.profileService.getProfileBuyer(this.tokenService.getToken()).subscribe(data => {
        this.buyerName = data.name;
        this.buyerEmail = data.email;
      });
    }

  }
