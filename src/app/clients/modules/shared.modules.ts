import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SearchFilterPipe } from '../filter';
import { Configuration } from '../../servers/config/configuration';
import { CategoryService } from '../../servers/service/category/category.service';
import { ClickOutsideDirective } from '../clickoutside';


@NgModule ({
  declarations: [
    SearchFilterPipe,
    ClickOutsideDirective
  ],
  exports: [
    CommonModule,
    SuiModule,
    SearchFilterPipe,
    ClickOutsideDirective
  ],
  providers: [
    Configuration,
    CategoryService,
  ]
})
export class SharedModules { }
