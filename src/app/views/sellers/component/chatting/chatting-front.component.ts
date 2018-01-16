import { ShareService } from './../../../../core/service/shared.service';
import { Router } from '@angular/router';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import * as io from 'socket.io-client';
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
  show: Boolean;
  user: any = this.loginsrv.whoLogin();
  chats = [];
  info: string;
  typingTimer: Object;
  msgInput: string;
  soc: any;
  connecting: boolean = true;

  constructor(private loginsrv: LoginService, private chat: ChatService, private router: Router, private shared: ShareService) { }

  ngOnInit() {
    let that = this;
    this.chat.connect({
      connect: function() {
        that.chats = [];
        that.connecting = false;
        // console.log('chat connected', that.chat.socket);
        const chat_hide = localStorage.chat_hide;
        if (chat_hide) {
          this.show = JSON.parse(localStorage.chat_hide);
        }
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
    }).then(soc => {
      this.soc = soc;
      console.log('chat ok:', soc);
    }, err => {
      console.log('chat:', err);
    })

  }

  send() {
    const msg = {from: this.user.username, txt: this.msgInput, time: new Date()};
    this.soc.emit('cln_msg', msg);
    this.chats.push(msg);
    this.msgInput = '';
  }

  hide() {
    if(this.soc) {
      this.show = !this.show;
      localStorage.chat_hide = this.show;
    }
    else {
      swal({
        title: 'Warning',
        text: 'Anda harus login untuk melanjutkan',
        type: 'warning',
      }).then(() => {
        this.shared.shareData = '/';
        this.router.navigate(['/login']);
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
        this.chat.disconnect();
      }
    })
  }
}
