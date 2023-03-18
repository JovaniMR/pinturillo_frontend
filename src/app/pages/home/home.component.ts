import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nickname: string = '';

  constructor(private socketWebService: SocketWebService){}

  onJoin(){
    this.socketWebService.setUserLogged(this.nickname);
    this.socketWebService.emitEventUserConnected(this.nickname);
  }
}
