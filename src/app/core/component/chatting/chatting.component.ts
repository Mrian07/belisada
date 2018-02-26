import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import { ShareService } from '../../service/shared.service';
import { LoginService } from '../../service/login/login.service';
import { ChatService } from '../../service/chat/chat.service';
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
export class ChattingComponent implements OnInit {
  hiden: boolean = !localStorage.chat_hide || JSON.parse(localStorage.chat_hide);
  onSignIn: boolean = this.router.url == '/sign-in';
  user: any;
  chats = [];
  info: string;
  typingTimer: Object;
  msgInput: string;
  soc: any;
  chatStage: number;
  cs: any;
  rating: number;

  constructor(private loginsrv: LoginService, private chat: ChatService, private router: Router, private shared: ShareService) { }

  ngOnInit() {
    this.user = this.loginsrv.whoLogin();
    this.chat.change.subscribe(hiden => {
      this.hiden = hiden;
    });

    if(!this.hiden) {
      this.connect().then(soc => this.soc = soc, err => {
        if(err == 401) {
          this.hiden = true;
        }
      });
    }
  }
  connect() {
    this.chatStage = 2;
    return this.chat.connect({
      connect: () => {
        // console.log('soc:', this.soc);
        this.chats = [];
        this.chatStage = 1;
      },
      reconnect_attempt: () => {
        this.chatStage = 2;
        console.log('reconnecting');
      },
      history: his => {
        this.chats = his;
      },
      msg: msg => {
        this.chats.push(msg);
        this.info = '';
      },
      typing: cs => {
        if(!this.cs || this.cs.email != cs) {
          this.soc.emit('get_cs_detail', cs);
        }
        this.info = 'typing';
        this.typingTimer = setTimeout(() => this.info = '', 4000);
      },
      close_chat: msg => {
        this.chats.push(msg);
        this.chatStage = 3;
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
    if(!this.soc || !this.soc.connected) {
      this.connect().then(soc => this.soc = soc, err => {
        console.log('chat:', err);
        if(err == 100) {
          return false;
        }
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
    this.soc.emit('close_msg', this.rating);
    this.chat.disconnect();
    this.hiden = true;
    this.chatStage = 4;
    delete this.cs;
  }

  close() {
    swal({
      showCancelButton: true,
      text: 'Akhiri percakapan?',
      type: 'warning',
    }).then(res => {
      if(res.value) {
        this.chatStage = 3;
      }
    })
  }
}
