import { Component, OnInit } from '@angular/core';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  listMessages: Array<any> = [];
  message: string = '';
  nickname!: string;


  constructor(private socketWebService: SocketWebService){}

  ngOnInit(): void {
    this.socketWebService.receiveMessage.subscribe((messages)=> {
      this.listMessages = messages;
    });

    this.socketWebService.getUserLogged.subscribe((user) => {
      this.nickname = user;
    });
  }
  
  onSendMessage(){
    let message = {
      user: this.nickname,
      message: this.message
    }
    this.socketWebService.emitEventSendMessage(message);
    this.message = '';
  }
}
