import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { Category2 } from '../../../../core/model/category2';
import { CategoryService } from '../../../../core/service/category/category.service';
import { Router } from '@angular/router';

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

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
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

}
