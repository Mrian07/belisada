import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import Socket = SocketIOClient.Socket;
import { LocalStorageEnum } from '@belisada/core/enum';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChatRoom } from '@belisada/core/models/chat/chat-room.model';
import { ChatMessage } from '@belisada/core/models/chat/chat-message.model';

import { Globals } from '@belisada/core/services/globals/globals';
import { environment } from '@env/environment';
import { JoinRoom } from '@belisada/core/interfaces/join-room.interface';

const chatUrl = environment.chatUrl + ':' + environment.chatServerPort;
const socketUrl = environment.chatUrl + ':' + environment.socketServerPort;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor(private http: HttpClient, private globals: Globals) {}

  connectSocket(): Socket {
    this.socket = io(socketUrl + '/rooms',
      {query: { token: localStorage.getItem(LocalStorageEnum.TOKEN_KEY) }});
    return this.socket;
  }

  getMyChatRooms(id): Observable<ChatRoom[]>  {
    return this.http.get(chatUrl + '/api/rooms' , {params: {userId: id}})
      .pipe(
        map(response => response as ChatRoom[])
      );
  }

  joinRoom(joinRoom: JoinRoom) {
    this.socket.emit('join', joinRoom);
  }

  sendMessage(message: ChatMessage, room: string) {
    const data = {
      message: message,
      room: room
    };
    this.socket.emit('message', data);
  }

  show() {
    this.globals.showChat = true;
  }

  hide() {
    this.globals.showChat = false;
  }

  setStoreId(storeId: number) {
    this.globals.storeId = storeId;
  }

  getStoreId() {
    return this.globals.storeId;
  }
}
