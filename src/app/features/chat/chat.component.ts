import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, StoreService, Globals } from '@belisada/core/services';
import { UserData } from '@belisada/core/models';
import { ChatRoom } from '@belisada/core/models/chat/chat-room.model';
import { ChatService } from '@belisada/core/services/globals/chat.service';
import { ChatMessage } from '@belisada/core/models/chat/chat-message.model';

import Socket = SocketIOClient.Socket;
import { ProfileStoreResponse } from '@belisada/core/models/store/store.model';
import { RoomTypeEnum } from '@belisada/core/enum/room-type.enum';

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
  public profileStoreResponse: ProfileStoreResponse = new ProfileStoreResponse;
  public roomData: ChatRoom = new ChatRoom;

  public globals: Globals;

  _id: string;
  selectedRoom: any;

  // storeId: number;

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private userService: UserService,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.userData = this.userService.getUserData();
    this.chatService.getMyChatRooms(this.userData.userId).subscribe(res => {
      this.chatRooms = res;
      this.selectedRoom = res[0];
      console.log('this.chatRooms: ', this.chatRooms);
    });
    console.log('userData: ', this.userData);
    this.socket = this.chatService.connectSocket();
    console.log('storeID:', this.chatService.getStoreId());
    this.chatService.joinRoom({
      uniqueIdentifier: undefined,
      senderId: this.userData.userId,
      receiverId: this.chatService.getStoreId(),
      roomType: RoomTypeEnum.BS
    });

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

  activateRoom(room) {
    this.selectedRoom = room;
    this.chatMessages = [];
    // tslint:disable-next-line:max-line-length
    this.chatService.joinRoom({ uniqueIdentifier: this.selectedRoom.uniqueIdentifier, senderId: 0, receiverId: 0, roomType: RoomTypeEnum.BS });
  }

  submit() {
    console.log('Submited');
    this.chatFormGroup.patchValue({
      room: this.selectedRoom._id,
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

  exit() {
    this.chatService.hide();
  }
}
