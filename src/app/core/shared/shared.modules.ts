import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';
import { CommonModule } from '@angular/common';
import { NgDatepickerModule } from 'ng2-datepicker';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SearchFilterPipe } from '../pipe/filter';
import { Configuration } from '../config/configuration';
import { CategoryService } from '../service/category/category.service';
import { MasterService } from '../service/master/master.service';
import { TokenService } from '../service/token/token.service';
import { ShareService } from '../service/shared.service';

@NgModule ({
  declarations: [
    SearchFilterPipe,
  ],
  imports: [
  ],
  exports: [
    CommonModule,
    SuiModule,
    NgDatepickerModule,
    SearchFilterPipe,
  ],
  providers: [
    Configuration,
    CategoryService,
    MasterService,
    TokenService,
    ShareService
  ]
})
export class SharedModules { }
