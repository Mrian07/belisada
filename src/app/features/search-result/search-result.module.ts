import { SearchResultComponent } from './search-result.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../theme/theme.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    ThemeModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    SearchResultComponent,
    ProductListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchResultModule { }
