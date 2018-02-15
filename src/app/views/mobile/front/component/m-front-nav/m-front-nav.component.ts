import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../../../../core/model/category';
import { Category2 } from '../../../../../core/model/category2';
import { CategoryService } from '../../../../../core/service/category/category.service';
import * as frontActions from '../../../../../store/actions/front';
import * as fromProduct from '../../../../../store/reducers';
import { ShareService } from '../../../../../core/service/shared.service';

@Component({
  selector: 'app-m-front-nav',
  templateUrl: './m-front-nav.component.html',
  styleUrls: ['./m-front-nav.component.scss']
})
export class MFrontNavComponent implements OnInit {

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
  ) { }

  ngOnInit() {
    this.getNavigationCategory();
    this.lang = localStorage.getItem('languange');
  }

  // @HostListener('document:click', ['$event']) clickedOutside($event) {
  //   this.closeNav();
  // }

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

  toList(aliasname, id) {
    this.router.navigateByUrl('/mobile/m-category/' + id + '/' + aliasname);
  }


  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
    document.body.style.backgroundColor = 'white';
  }


}
