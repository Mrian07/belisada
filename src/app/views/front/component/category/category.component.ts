import { SearchService } from './../../../../core/service/search/search.service';
import { Category2 } from './../../../../core/model/category2';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/service/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  level_3: Observable<Category2[]>;
  m_product_category_id: any;
  queryParams: any = {};
  alias: Category2 = new Category2();
  loadCategory: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private search: SearchService,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.Categorys>,
) {
    this.route.params.subscribe( params => {
      this.m_product_category_id = params.id;
      this.store.dispatch(new frontActions.GetCategory(params.id));
    });
  }

  ngOnInit() {
    this.loadCategory = this.actionsSubject
    .asObservable()
    .filter(action => action.type === frontActions.GETCATEGORYSUCCESS)
    .subscribe((action: frontActions.GetCategorySuccess) => {
      this.Category();
    });
  }

  Category() {
    this.level_3 = this.store.select<any>(fromProduct.getCategoryState);
  }

  dapatkanList(id) {
    this.queryParams =  {
      parent : 3,
      id : id
    };
    this.router.navigate(['/product-list'], { queryParams: this.queryParams });
  }

  reloadr() {
    location.reload();
  }

}
