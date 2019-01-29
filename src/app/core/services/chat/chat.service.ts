import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import Socket = SocketIOClient.Socket;
import { LocalStorageEnum } from '@belisada/core/enum';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChatRoom } from '@belisada/core/models/chat/chat-room.model';
import { ChatMessage } from '@belisada/core/models/chat/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor(private http: HttpClient) {}

  connectSocket(): Socket {
    this.socket = io('http://localhost:1090/rooms', {query: { token: localStorage.getItem(LocalStorageEnum.TOKEN_KEY) }});
    return this.socket;
  }

  getMyChatRooms(id): Observable<ChatRoom[]>  {
    return this.http.get('http://localhost:3000/api/rooms', {params: {userId: id}})
      .pipe(
        map(response => response as ChatRoom[])
      );
  }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  sendMessage(message: ChatMessage, room: string) {
    const data = {
      message: message,
      room: room
    };
    this.socket.emit('message', data);
  }
}
