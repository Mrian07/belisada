import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ThemeModule } from 'app/theme/theme.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    CommonModule,
    ThemeModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
