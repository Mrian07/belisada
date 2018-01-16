import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import * as io from "socket.io-client";
import { LoginService } from '../login/login.service';
import { environment } from '../../../../environments/environment';
import { Promise, reject, resolve } from 'q';
// import { reject, resolve } from 'q';

@Injectable()
export class ChatService {
  private socket;
  private user: any = this.login.whoLogin();

  constructor(private cnf: Configuration, private login: LoginService) { }

  connect(event: Object): Promise<any> {
    return Promise((resolve, reject) => {
      if (!this.user) {
        reject('not login yet');
      }
      this.socket = io(environment.chatUrl + '/?dat=' + this.user.token);
      this.socket.on('disconnect', () => {
        console.log('you\'re offline');
      });
      for(let e in event) {
        this.socket.on(e, event[e]);
      }
      resolve(this.socket);
    });
  }

  disconnect() {
    if(this.socket) this.socket.disconnect();
  }
}
