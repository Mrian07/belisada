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
import { ShareService, ActiveLink } from '../service/shared.service';
import { LocalStorageService } from '../service/storage.service';
import { AddproductService } from '../service/addproduct/addproduct.service';
import { ChatService } from '../service/chat/chat.service';
import { DatePipe } from '@angular/common/';
import { SanitizeHtmlPipe } from '../pipe/sanitizer';
import { ProfileService } from '../service/profile/profile.service';


@NgModule ({
  declarations: [
    SearchFilterPipe,
    SanitizeHtmlPipe
  ],
  imports: [
  ],
  exports: [
    CommonModule,
    SuiModule,
    NgDatepickerModule,
    SearchFilterPipe,
    SanitizeHtmlPipe
  ],
  providers: [
    Configuration,
    CategoryService,
    MasterService,
    TokenService,
    ShareService,
    ActiveLink,
    LocalStorageService,
    ChatService,
    DatePipe,
    ProfileService
  ]
})
export class SharedModules { }
