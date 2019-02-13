import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, StoreService, Globals } from '@belisada/core/services';
import { UserData } from '@belisada/core/models';
import { ChatRoom } from '@belisada/core/models/chat/chat-room.model';
import { ChatService } from '@belisada/core/services/globals/chat.service';
import { ChatMessage } from '@belisada/core/models/chat/chat-message.model';

import Socket = SocketIOClient.Socket;
import { ProfileStoreResponse } from '@belisada/core/models/store/store.model';
import { RoomTypeEnum } from '@belisada/core/enum/room-type.enum';
import { JoinRoom } from '@belisada/core/interfaces/join-room.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messages') private messagesContainer: ElementRef;

  private socket: Socket;

  public chatFormGroup: FormGroup;
  public chatMessages = [];
  public chatRooms: ChatRoom[] = [];
  public userData: UserData = new UserData;
  public profileStoreResponse: ProfileStoreResponse = new ProfileStoreResponse;
  public roomData: ChatRoom = new ChatRoom;

  _id: string;
  selectedRoom: any;

  // storeId: number;

  constructor(
    public globals: Globals,
    private chatService: ChatService,
    private fb: FormBuilder,
    private userService: UserService,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.userData = this.userService.getUserData();

    this.socket = this.globals.socket;

    this.findAndJoinRoom();


    this.socket.on('users', (userIds: string[]) => {
      console.log('--- users ---:userids-> ', userIds);
    });

    this.socket.on('message', (datas: any[]) => {
      console.log('--- message ---:data-> ', datas);
      this.chatMessages = [...this.chatMessages, ...datas];
      this.scrollToBottom();
      // this.findAndJoinRoom();
      console.log('chatMessages: ', this.chatMessages);
    });

    this.createForm();
  }

  findAndJoinRoom() {
    this.chatService.getMyChatRooms(this.userData.userId).subscribe(res => {
      this.chatRooms = res.filter(x => this.userData.userId === +x.unique_identifier.split('~')[0]);
      this.selectedRoom = this.chatRooms[0];
      const joinRoom = new JoinRoom();
      joinRoom.uniqueIdentifier = this.selectedRoom.unique_identifier;
      joinRoom.roomType = RoomTypeEnum.BS;
      this.chatService.joinRoom(joinRoom);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
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

    const joinRoom = new JoinRoom();
    joinRoom.uniqueIdentifier = this.selectedRoom.unique_identifier;
    joinRoom.roomType = RoomTypeEnum.BS;

    this.chatService.joinRoom(joinRoom);
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
    this.chatFormGroup.controls['message'].reset();
  }

  exit() {
    this.chatService.hide();
  }

  scrollToBottom(): void {
    try {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
}
}
