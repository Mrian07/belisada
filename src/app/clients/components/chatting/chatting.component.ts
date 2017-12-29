import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import * as io from 'socket.io-client';
import { LoginService } from '../../../servers/service/login/login.service';

@Component({
  selector: 'app-chatting',
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
export class ChattingComponent implements OnInit {
  show: Boolean;
  user: any = this.loginsrv.whoLogin();
  chats: any[];
  info: string;
  socket: any;
  typingTimer: Object;
  msgInput: string;

  constructor(private loginsrv: LoginService) { }

  ngOnInit() {
    const chat = localStorage.chat_hide;
    if (chat) {
      this.show = JSON.parse(localStorage.chat_hide);
    }
    const url = 'https://chat.myacico.co.id';
    const that = this;
    this.socket = io(url + '/?dat=' + this.user.token);
    this.socket.on('connect', () => {
      this.chats = [];
      console.log('chat connected', this.socket);
    });
    this.socket.on('disconnect', () => {
      console.log('you\'re offline');
    });
    this.socket.on('history', his => {
      that.chats = his;
    });
    this.socket.on('msg', msg => {
      that.chats.push(msg);
      that.info = '';
    });
    this.socket.on('typing', () => {
      that.info = 'typing';
      that.typingTimer = setTimeout(() => {that.info = ''}, 4000);
    });
  }

  send() {
    const msg = {from: this.user.username, txt: this.msgInput, time: new Date()};
    this.socket.emit('cln_msg', msg);
    this.chats.push(msg);
    this.msgInput = '';
  }

  hide() {
    this.show = !this.show;
    localStorage.chat_hide = this.show;
  }
}
