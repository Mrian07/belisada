import { Component, Input, HostListener, ViewEncapsulation, ElementRef } from '@angular/core';
import { Category } from '@belisada/core/models/category/category.model';

@Component({
  selector: 'bs-category-menu',
  template: `
    <li class="navigation__category">
      <fa-icon [icon]="['fas', 'bars']"></fa-icon> KATEGORI PRODUK
      <ul class="category__detail" [ngClass]="{'show': categoryMenuShow}">
        <li class="category--2" *ngFor="let category of categories">{{ category.name }}
          <ul class="category__detail--2">
            <li class="category--3" *ngFor="let child of category.childs">
              <a [routerLink]="['/search-result/product-list']" [queryParams]="{category: child.categoryId}">{{ child.name }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  `,
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryMenuComponent {
  public categoryMenuShow: boolean;

  @Input() categories: Category[];

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.categoryMenuShow = true;
    } else {
      this.categoryMenuShow = false;
    }
  }

  constructor(private eRef: ElementRef) {
    this.categoryMenuShow = false;
    this.categories = [];
  }
}
