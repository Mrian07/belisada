import { SearchResultComponent } from './search-result.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../theme/theme.module';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { StoreListComponent } from './store-list/store-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { Ng5SliderModule } from 'ng5-slider';

library.add(fas, far, fab);

@NgModule({
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    ThemeModule,
    FormsModule,
    FontAwesomeModule,
    Ng5SliderModule
  ],
  declarations: [
    SearchResultComponent,
    ProductListComponent,
    SidebarComponent,
    StoreListComponent
  ],
  providers: [ ],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchResultModule { }
