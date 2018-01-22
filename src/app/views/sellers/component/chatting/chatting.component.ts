import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import * as io from 'socket.io-client';
import { LoginService } from '../../../../core/service/login/login.service';
import { ChatService } from '../../../../core/service/chat/chat.service';

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
  hiden: Boolean = !localStorage.chat_hide || JSON.parse(localStorage.chat_hide);
  user: any = this.loginsrv.whoLogin();
  chats = [];
  info: string;
  typingTimer: Object;
  msgInput: string;
  soc: any;
  stat: number = 0;
  connecting: boolean = true;
  onSignIn: boolean;

  constructor(private loginsrv: LoginService, private chat: ChatService) { }

  ngOnInit() {
    if(!this.hiden) {
      this.connect().then(soc => this.soc = soc, err => this.hiden = true);
    }
    // console.log('chat url', environment.chatUrl);
    // let that = this;
    // let socket = this.chat.connect({
    //   connect: function() {
    //     that.chats = [];
    //     // console.log('chat connected', that.soc);
    //   },
    //   history: his => {
    //     that.chats = his;
    //     that.stat = 1;
    //   },
    //   msg: msg => {
    //     that.chats.push(msg);
    //     that.info = '';
    //   },
    //   typing: () => {
    //     that.info = 'typing';
    //     that.typingTimer = setTimeout(() => {that.info = ''}, 4000);
    //   }
    // }).then(soc => this.soc = soc, err => console.log('chat err:', err));
    

    // this.chat.socket = io(environment.chatUrl + '/?dat=' + this.user.token);
    // this.chat.socket.on('connect', () => {
    //   that.chats = [];
    //   console.log('chat connected', that.chat.socket);
    // });
    // this.chat.socket.on('disconnect', () => {
    //   console.log('you\'re offline');
    // });
    // this.chat.socket.on('history', his => {
    //   that.chats = his;
    // });
    // this.chat.socket.on('msg', msg => {
    //   that.chats.push(msg);
    //   that.info = '';
    // });
    // this.chat.socket.on('typing', () => {
    //   that.info = 'typing';
    //   that.typingTimer = setTimeout(() => {that.info = ''}, 4000);
    // });
  }

  connect() {
    let that = this;
    return this.chat.connect({
      connect: function() {
        that.chats = [];
        that.connecting = false;
      },
      reconnect_attempt: () => {
        console.log('reconnecting');
      },
      history: his => {
        that.chats = his;
      },
      msg: msg => {
        that.chats.push(msg);
        that.info = '';
      },
      typing: () => {
        that.info = 'typing';
        that.typingTimer = setTimeout(() => {that.info = ''}, 4000);
      }
    });
  }

  send() {
    const msg = {from: this.user.username, txt: this.msgInput, time: new Date()};
    this.soc.emit('cln_msg', msg);
    this.chats.push(msg);
    this.msgInput = '';
  }

  hide() {
    this.hiden = !this.hiden;
    localStorage.chat_hide = this.hiden;
  }
}
