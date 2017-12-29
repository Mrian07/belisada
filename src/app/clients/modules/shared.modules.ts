import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SearchFilterPipe } from '../filter';
import { Configuration } from '../../servers/config/configuration';
import { CategoryService } from '../../servers/service/category/category.service';
import { MasterService } from '../../servers/service/master/master.service';


@NgModule ({
  declarations: [
    SearchFilterPipe
  ],
  exports: [
    CommonModule,
    SuiModule,
    SearchFilterPipe
  ],
  providers: [
    Configuration,
    CategoryService,
    MasterService
  ]
})
export class SharedModules { }
