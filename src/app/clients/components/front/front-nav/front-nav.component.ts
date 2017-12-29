import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../servers/model/category';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { Category2 } from '../../../../servers/model/category2';

@Component({
  selector: 'app-front-nav',
  templateUrl: './front-nav.component.html',
  styleUrls: ['./front-nav.component.scss']
})
export class FrontNavComponent implements OnInit {

  c1: Category[];
  c2: Category2[];
  imgTop: any;
  navigationObject: any[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getNavigationCategory();
  }

  getCategoryOne(successCallback) {
    this.categoryService.CategoryOne().subscribe(data => {
      this.c1 = data;
      console.log('this.c1: ', this.c1);
      successCallback();
    });
  }

  getCategoryTwo(categoryOneId) {
    this.categoryService.CategoryTwo(categoryOneId).subscribe(data => {
      this.c2 = data;
    });
  }

  getNavigationCategory() {
    this.getCategoryOne(() => {
      for (let item in this.c1) {
        console.log('item: ', item);
        // this.navigationObject.push(item);
        // console.log('this.navigationObject: ', this.navigationObject);
      }
    })
  }

}
