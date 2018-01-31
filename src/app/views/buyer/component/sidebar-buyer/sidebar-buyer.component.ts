import { UpgradeService } from './../../../../core/service/upgrade/upgrade.service';
import { Upgrade } from './../../../../core/model/upgrade';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { Category2 } from '../../../../core/model/category2';
import { CategoryService } from '../../../../core/service/category/category.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../../core/service/token/token.service';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-buyer',
  templateUrl: './sidebar-buyer.component.html',
  styleUrls: ['./sidebar-buyer.component.scss']
})
export class SidebarBuyerComponent implements OnInit {

  c1: Category[];
  c2: Category2[];
  imgTop: any;
  navigationObjects: any[] = [];
  editProfile: any;

  buyerName: string;
  buyerEmail: string;
  buyerImage: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private profileService: ProfileService,
    private tokenService: TokenService,
    private upgradeService: UpgradeService,
  ) { }

  ngOnInit() {
    this.getProfileBuyer();
    this.getNavigationCategory();
  }

  getCategoryOne(cb) {
    this.categoryService.CategoryOne().subscribe(data => {
      this.c1 = data;
      cb();
    });
  }

  getCategoryTwo(categoryOneId, cb) {
    this.categoryService.CategoryTwo(categoryOneId).subscribe(data => {
      this.c2 = data;
      cb();
    });
  }

  getNavigationCategory() {
    this.getCategoryOne(() => {
      this.c1.forEach((item, index) => {
        // console.log('item: ', item);
        this.navigationObjects.push(item);
        this.getCategoryTwo(item.mProductCategoryId, () => {
          this.navigationObjects[index]['c2'] = this.c2;
        });
        // console.log('this.navigationObject: ', this.navigationObject);
      });
    });
  }

  editProfileBuyer() {
    this.router.navigate(['/buyer/profile-buyer']);
  }

  getProfileBuyer() {
    this.profileService.getProfileBuyer(this.tokenService.getToken()).subscribe(data => {
      console.log('iniloh', data);
      this.buyerName = data.name;
      this.buyerEmail = data.email;
      this.buyerImage = 'data:image/png;base64,' + data.imageAvatar;
      console.log('iii', this.buyerImage);
    });
  }


  goSeller() {
    this.router.navigateByUrl('/buyer');
    const user = JSON.parse(localStorage.user);
    if (user.role === 3 || user.role === 2) {
      this.router.navigateByUrl('/seller/dashboard');
    } else {

      swal({
        title: 'Warning',
        text: 'Anda belum menjadi Seller. Apakah Anda ingin mendaftar sebagai Seller?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1d7d0a',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Daftar Sebagai Seller'
      }).then((result) => {
        if (result.value) {
            this.router.navigateByUrl('/buyer/seller-propose');
        } else {
            return false;
        }
      });

   }

  }

  goDashboard() {
    this.router.navigateByUrl('/buyer/dashboard');
  }

  goWishlist() {
    this.router.navigateByUrl('/buyer/wishlist-buyer');
  }

  goInbox() {
    this.router.navigateByUrl('/buyer/inbox-buyer');
  }



  // goSeller() {

  //   const user = JSON.parse(localStorage.user);
  //   this.router.navigateByUrl('/buyer/dashboard');

  //   if (user.role === 3 || user.role === 2) {
  //     this.router.navigateByUrl('/seller/dashboard');
  //   } else {

  //     swal({
  //       title: 'Warning',
  //       text: 'Anda belum menjadi Seller. Apakah Anda ingin mendaftar sebagai Seller?',
  //       type: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#1d7d0a',
  //       cancelButtonColor: '#d33',
  //       cancelButtonText: 'Tidak',
  //       confirmButtonText: 'Daftar Sebagai Seller'
  //     }).then((result) => {
  //       if (result.value) {
  //         const data = {
  //           userType: '1'
  //         };
  //         this.upgradeService.upToSeller(data).subscribe(response => {
  //           this.router.navigateByUrl('/seller/dashboard');
  //         });

  //        // this.router.navigateByUrl('/register');
  //       } else {
  //           return false;
  //       }
  //     });

  //   }

  // }

}
