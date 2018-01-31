import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
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
  cs: any;

  constructor(private loginsrv: LoginService, private chat: ChatService) { }

  ngOnInit() {
    if(!this.hiden) {
      this.connect().then(soc => this.soc = soc, err => {
        this.hiden = true;
        localStorage.chat_hide = 'true';
      });
    }
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
      typing: cs => {
        if(!that.cs || that.cs.email != cs) {
          that.soc.emit('get_cs_detail', cs);
        }
        that.info = 'typing';
        that.typingTimer = setTimeout(() => {that.info = ''}, 4000);
      },
      close_chat: msg => {
        that.chats.push(msg);
      },
      cs_detail: cs => {
        this.cs = cs;
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
