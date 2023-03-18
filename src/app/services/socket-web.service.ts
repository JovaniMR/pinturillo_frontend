import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket{

  sendDraw: EventEmitter<any> = new EventEmitter();
  deleteDraw: EventEmitter<any> = new EventEmitter();
  newUserConnected: EventEmitter<any> = new EventEmitter();
  receiveMessage: EventEmitter<any> = new EventEmitter();

  private listUsers: Array<string> = [];
  private listMessages: Array<any> = [];

  currentUser$ = new BehaviorSubject('');

  constructor(
    private cookieService: CookieService,
    ) { 
      super({
        url: 'http://localhost:3000', 
        options: {
          query: {
            nameRoom: cookieService.get('room')
          },
          withCredentials: false  
        } 
      });

      this.listenDraw();
      this.listenDeleteDraw();
      this.listenUsersConnected();
      this.listenReceiveMessages();
  }
 
  /* user logged in */
  get getUserLogged(): Observable<string>{
    return this.currentUser$.asObservable();
  }

  setUserLogged(user: string){
    this.currentUser$.next(user);
  }

  /*Draw*/ 
  listenDraw(){
   this.ioSocket.on('event', (res: any) => this.sendDraw.emit(res));
  }

  emitEvent(payload: {}): void {
    this.ioSocket.emit('event', payload);
  }

  /*delete draw */
  listenDeleteDraw(){
    this.ioSocket.on('deleteDraw', (res: any) => this.deleteDraw.emit());
  }
 
  emitEventDeleteDraw(): void {
    this.ioSocket.emit('deleteDraw');
  }

  /*Users Connected socket*/ 
  listenUsersConnected(){
    this.ioSocket.on('newUserConnected', (user: any) => {
      this.listUsers.push(user)
      this.newUserConnected.emit(this.listUsers);
    });
  }

  emitEventUserConnected(nickname: string): void{
    this.ioSocket.emit('newUserConnected', nickname);
  }

  /*Chat*/
  listenReceiveMessages(){
    this.ioSocket.on('chat', (message: any) => {
      this.listMessages.push(message);
      this.receiveMessage.emit(this.listMessages);
    });
  }

  emitEventSendMessage(message: any): void{
    this.ioSocket.emit('chat', message);
  }
  
}
