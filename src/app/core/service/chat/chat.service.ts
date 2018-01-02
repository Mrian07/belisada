import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import * as io from "socket.io-client";
import { LoginService } from '../login/login.service';

@Injectable()
export class ChatService {
  public socket;

  constructor(private cnf: Configuration, private login: LoginService) { }

  disconnect() {
    if(this.socket) this.socket.disconnect();
  }

}
