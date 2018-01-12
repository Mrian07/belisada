import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import * as io from 'socket.io-client';
import { LoginService } from '../../../../core/service/login/login.service';
import { ChatService } from '../../../../core/service/chat/chat.service';

@Component({
  selector: 'app-chatting-front',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({opacity: 0}),
          animate('200ms', style({opacity: 1}))
        ]
      ),
        transition(
        ':leave', [
          style({opacity: 1}),
          animate('200ms', style({opacity: 0}))
        ]
      )]
    )
  ],
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingFrontComponent implements OnInit {
  show: Boolean;
  user: any = this.loginsrv.whoLogin();
  chats = [];
  info: string;
  typingTimer: Object;
  msgInput: string;

  constructor(private loginsrv: LoginService, private chat: ChatService) { }

  ngOnInit() {
    console.log('chat url', environment.chatUrl);
    const chat_hide = localStorage.chat_hide;
    if (chat_hide) {
      this.show = JSON.parse(localStorage.chat_hide);
    }
    let that = this;
    this.chat.socket = io(environment.chatUrl + '/?dat=' + this.user.token);
    this.chat.socket.on('connect', () => {
      that.chats = [];
      console.log('chat connected', that.chat.socket);
    });
    this.chat.socket.on('disconnect', () => {
      console.log('you\'re offline');
    });
    this.chat.socket.on('history', his => {
      that.chats = his;
    });
    this.chat.socket.on('msg', msg => {
      that.chats.push(msg);
      that.info = '';
    });
    this.chat.socket.on('typing', () => {
      that.info = 'typing';
      that.typingTimer = setTimeout(() => {that.info = ''}, 4000);
    });
  }

  send() {
    const msg = {from: this.user.username, txt: this.msgInput, time: new Date()};
    this.chat.socket.emit('cln_msg', msg);
    this.chats.push(msg);
    this.msgInput = '';
  }

  hide() {
    this.show = !this.show;
    localStorage.chat_hide = this.show;
  }
}
