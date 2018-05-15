import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { MyDatePickerModule } from 'mydatepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './config/configuration';

import { throwIfAlreadyLoaded } from '@belisada/core/module-import.guard';

// import { FilterPipe } from '@belisada/shared/pipes';

import { JWTUtil, DateUtil } from '@belisada/core/util';

import {
  UserService, StoreService, SubscribeService,
  AuthService, ShareMessageService, OnlyLoggedInUsersGuard
} from '@belisada/core/services';

const BELISADA_UTILS = [
  JWTUtil,
  DateUtil,
];

const BELISADA_PROVIDERS = [
  AuthService,
  Configuration,
  UserService,
  StoreService,
  SubscribeService,
  ShareMessageService,
  OnlyLoggedInUsersGuard,
];

@NgModule({
  declarations: [
    // FilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MyDatePickerModule,
  ],
  providers: [
    ...BELISADA_UTILS,
    ...BELISADA_PROVIDERS
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
