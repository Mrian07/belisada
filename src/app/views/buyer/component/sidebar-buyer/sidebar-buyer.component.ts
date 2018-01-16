import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { Category2 } from '../../../../core/model/category2';
import { CategoryService } from '../../../../core/service/category/category.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../../core/service/token/token.service';
import { ProfileService } from '../../../../core/service/profile/profile.service';

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
    private tokenService: TokenService
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
      this.buyerName = data.name;
      this.buyerEmail = data.email;
      this.buyerImage = 'data:image/png;base64,' + data.imageAvatar;
    });
  }

}
