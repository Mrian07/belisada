import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../../../servers/service/profile/profile.service';
import swal from 'sweetalert2';

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
  edit: any;
  constructor(private profileService: ProfileService) { }
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerNpwp: string;
  sellerImgAvatar: string;
  sellerImgNpwp: string;
  sellerDateOfBirth: string;

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log('kosong');
    }else {
      const data = JSON.parse(localStorage.user);
        if (data) {
          this.sellerName = data.name;
          this.sellerEmail = data.username;
          this.sellerPhone = data.phone;
          this.sellerNpwp = data.npwp;

          this.sellerImgAvatar = '11';
          this.sellerImgNpwp = '22';
          this.sellerDateOfBirth = '333';
        }
    }
  }

  updateProfile(){

    const updateProfileData = {
      name : this.sellerName,
      npwp : this.sellerNpwp,
      phone : this.sellerPhone,
      imageAvatar : this.sellerImgAvatar,
      imageNPWP : this.sellerImgNpwp,
      dateOfBirth : this.sellerDateOfBirth,
    };

    // console.log(updateProfileData);
    // this.profileService.updateProfile(updateProfileData).subscribe(data => {
    //   if (data.status === '1') {
    //     swal(
    //       'success',
    //       data.message,
    //       'success'
    //     );
    //   }else {
    //     swal(
    //       'Opps!',
    //       data.message,
    //       'error'
    //     );
    //   }
    // });

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

  // edit() {
  //   if(){
  //     alert('Nama tidak boleh kosong');
  //   }
  // }

}
