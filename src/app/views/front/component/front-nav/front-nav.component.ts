import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../../../core/model/category';
import { Category2 } from '../../../../core/model/category2';
import { CategoryService } from '../../../../core/service/category/category.service';
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';



@Component({
  selector: 'app-front-nav',
  templateUrl: './front-nav.component.html',
  styleUrls: ['./front-nav.component.scss']
})
export class FrontNavComponent implements OnInit {

  c1: Category[];
  c2: Category2[];
  imgTop: any;
  navigationObjects: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private store: Store<fromProduct.Navs>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new frontActions.GetNav());
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
  toList(id: number) {
    this.router.navigateByUrl('/category/' + id);
  }

}
