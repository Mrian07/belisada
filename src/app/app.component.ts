import { Category } from './model/category';
import { Component } from '@angular/core';
import { CategoryService } from './service/category/category.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  categories: Category[];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getAll().subscribe( data => {
      this.categories = data;
      console.log('this.categories', this.categories);
    });
  }
}
