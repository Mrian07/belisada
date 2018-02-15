import { SearchService } from '../../../../../core/service/search/search.service';
import { Category2 } from '../../../../../core/model/category2';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, NgZone } from '@angular/core';
import { CategoryService } from '../../../../../core/service/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as frontActions from '../../../../../store/actions/front';
import * as fromProduct from '../../../../../store/reducers';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { ShareService } from '../../../../../core/service/shared.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-m-category',
  templateUrl: './m-category.component.html',
  styleUrls: ['./m-category.component.scss']
})
export class MCategoryComponent implements OnInit {

  level_3: Observable<Category2[]>;
  m_product_category_id: any;
  editData: any;
  queryParams: any = {};
  alias: Category2 = new Category2();
  loadCategory: Subscription;
  loadError: Subscription;
  total: number;
  pageError: any;
  lang: any;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private shared: ShareService,
    private search: SearchService,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.Categorys>,
    private ngZone: NgZone,
    private title: Title,
    private translate: TranslateService
) {
    this.route.params.subscribe( params => {
      this.m_product_category_id = params.id;
      this.store.dispatch(new frontActions.GetCategory(params.id));
    });
  }

  ngOnInit() {
    const lang = localStorage.getItem('languange');
    if (!lang) {
      localStorage.setItem('languange', 'in');
      this.lang = localStorage.getItem('languange');
      this.translate.use(this.lang);
    }else {
      this.lang = localStorage.getItem('languange');
      this.translate.use(this.lang);
    }
    this.loadCategory = this.actionsSubject
    .asObservable()
    .filter(action => action.type === frontActions.GETCATEGORYSUCCESS)
    .subscribe((action: frontActions.GetCategorySuccess) => {
       this.Category();
       this.pageError = false;
    });
    this.loadError = this.actionsSubject
    .asObservable()
    .filter(action => action.type === frontActions.FAILURE)
    .subscribe((action: frontActions.Failure) => {
      //console.log('err', action);
      this.pageError = true;
     // this.level_3 = Observable.of(er);
       //this.Category();

    });
  }

  Category() {
    this.ngZone.run(() => {
      this.level_3 = this.store.select<any>(fromProduct.getCategoryState);
      this.level_3.subscribe(data => {
        //console.log(data);
        this.total = data.length;
      });
      this.title.setTitle('Belisada - Category');
    } );
  }

  dapatkanList(id) {
    this.queryParams =  {
      parent : 3,
      id : id,
      ob : 6
    };
    this.router.navigate(['/product-list'], { queryParams: this.queryParams });
  }

  reloadr() {
    location.reload();
  }

}
