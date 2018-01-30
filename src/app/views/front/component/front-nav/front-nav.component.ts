import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../../../core/model/category';
import { Category2 } from '../../../../core/model/category2';
import { CategoryService } from '../../../../core/service/category/category.service';
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';
import { ShareService } from '../../../../core/service/shared.service';



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
  alias: string;
  lang: any;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private shared: ShareService,
    private store: Store<fromProduct.Navs>
  ) {
  }

  ngOnInit() {
    this.lang = localStorage.getItem('languange');
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
        this.navigationObjects.push(item);
        this.getCategoryTwo(item.mProductCategoryId, () => {
          this.navigationObjects[index]['c2'] = this.c2;
        });
      });
    });
  }
  // toList(data) {
  //   this.shared.shareData = data;
  //   console.log('ah', data);
  //   this.router.navigateByUrl('/category/' + data.aliasname + '/' + data.m_product_category_id );
  // }
  toList(aliasname, id) {
    // this.router.navigate(['/category/' + aliasname], {relativeTo: this.route});
    this.router.navigateByUrl('/category/' + id + '/' + aliasname);
  // toList(id: number) {
  //   this.shared.shareData = id;
  //   this.router.navigateByUrl('/category/' + id);
  }

}
