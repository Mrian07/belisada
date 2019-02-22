import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ThemeModule } from 'app/theme/theme.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  NgxEmojiPickerModule  } from 'ngx-emoji-picker';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    CommonModule,
    ThemeModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEmojiPickerModule
  ],
  declarations: []
})
export class ChatModule { }
