import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserData } from '@belisada/core/models/user/user.model';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { environment } from '@env/environment';
import { CreateRoomRequest, Message } from '@belisada/core/models/chat/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private storeId: string;

    constructor(private socket: Socket, private http: HttpClient) {

      // super();
      // this.socket = socket;
      // this.http = http;
      // this.userId = userId;

      // this.InitializeSocketListerners();
    }

    // sendMessage(msg: string) {
    //     this.socket.emit('message', msg);
    // }

    // getMessage() {
    //     return this.socket
    //         .fromEvent<any>('message')
    //         .pipe(
    //           map( data => data.msg )
    //         );
    // }

    // listFriends(): Observable<UserData[]> {
    //   // List connected users to show in the friends list
    //   // Sending the userId from the request body as this is just a demo
    //   return this.http
    //       .post('http://192.168.3.20:3000/listFriends', { storeId: this.storeId })
    //       .pipe(
    //           map(response => response as UserData[]),
    //           catchError((error: any) => Observable.throw(error.json().error || 'Server error'))
    //       );
    // }

    createRoom(data: CreateRoomRequest) {
      return this.http.post(environment.chatUrl + ':' + environment.chatServerPort + '/api/rooms', data)
      .pipe(
        map(rsl => rsl as CreateRoomRequest)
      );
    }

    sendMessage(message: Message, room) {
      const data = {
        message: message,
        room: room
      };
      this.socket.emit('message', data);
    }


    // getAllRoom() {

    // }
}
