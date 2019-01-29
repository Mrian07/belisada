import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@belisada/core/services';
import { UserData } from '@belisada/core/models';
import { ChatRoom } from '@belisada/core/models/chat/chat-room.model';
import { ChatService } from '@belisada/core/services/chat/chat.service';
import { ChatMessage } from '@belisada/core/models/chat/chat-message.model';

import Socket = SocketIOClient.Socket;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private socket: Socket;

  public chatFormGroup: FormGroup;
  public chatMessages = [];
  public chatRooms: ChatRoom[] = [];
  public userData: UserData = new UserData;

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userData = this.userService.getUserData();
    this.chatService.getMyChatRooms(this.userData.userId).subscribe(res => {
      this.chatRooms = res;
      console.log('this.chatRooms: ', this.chatRooms);
    });
    console.log('userData: ', this.userData);
    this.socket = this.chatService.connectSocket();
    this.chatService.joinRoom('5c4ed9ce5ab0a221e7b8caf3');

    this.socket.on('users', (userIds: string[]) => {
      console.log('--- users ---:userids-> ', userIds);
    });

    this.socket.on('message', (datas: any[]) => {
      console.log('--- message ---:data-> ', datas);
      this.chatMessages = [...this.chatMessages, ...datas];
      console.log('chatMessages: ', this.chatMessages);
    });

    this.createForm();
  }

  createForm() {
    this.chatFormGroup = this.fb.group({
      message: ['', Validators.required],
      room: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  submit() {
    console.log('Submited');
    this.chatFormGroup.patchValue({
      room: '5c4ed9ce5ab0a221e7b8caf3',
      userId: this.userService.getUserData().userId
    });

    const message: ChatMessage = new ChatMessage();
    message.message = this.chatFormGroup.controls['message'].value;
    message.userId = this.chatFormGroup.controls['userId'].value;
    message.date = new Date();

    const room = this.chatFormGroup.controls['room'].value;

    console.log('message: ', message);
    console.log('room: ', room);
    this.chatService.sendMessage(message, room);
  }

}
