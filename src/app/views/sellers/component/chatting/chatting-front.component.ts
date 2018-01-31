import { ShareService } from './../../../../core/service/shared.service';
import { Router } from '@angular/router';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import { LoginService } from '../../../../core/service/login/login.service';
import { ChatService } from '../../../../core/service/chat/chat.service';
import swal from 'sweetalert2';

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
  hiden: Boolean = !localStorage.chat_hide || JSON.parse(localStorage.chat_hide);
  onSignIn: boolean = this.router.url == '/sign-in';
  user: any = this.loginsrv.whoLogin();
  chats = [];
  info: string;
  typingTimer: Object;
  msgInput: string;
  soc: any;
  connecting: boolean = true;
  cs: any;

  constructor(private loginsrv: LoginService, private chat: ChatService, private router: Router, private shared: ShareService) { }

  ngOnInit() {
    if(!this.hiden) {
      this.connect().then(soc => this.soc = soc, err => this.hiden = true);
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
        that.typingTimer = setTimeout(() => that.info = '', 4000);
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
    // console.log('chat_hide', this.hiden, this.user);
    this.hiden = !this.hiden;
    localStorage.chat_hide = this.hiden;
    if(!this.soc) {
      this.connect().then(soc => this.soc = soc, err => {
        console.log('chat:', err);
        swal({
          title: 'Warning',
          text: 'Anda harus login untuk melanjutkan',
          type: 'warning',
        }).then(() => {
          this.shared.shareData = '/';
          this.router.navigate(['/sign-in']);
        })
      })
    }
  }
  disconnect() {
    swal({
      showCancelButton: true,
      text: 'Akhiri percakapan?',
      type: 'warning',
    }).then(res => {
      if(res.value) {
        this.soc.emit('close_msg');
        this.hide();
      }
    })
  }
}
