import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './pages/room/room.component';
import { HomeComponent } from './pages/home/home.component';

import { CookieService } from 'ngx-cookie-service';
import { DrawComponent } from './components/draw/draw.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SocketWebService } from './services/socket-web.service';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';


const config: SocketIoConfig = { 
  url: 'http://localhost:3000', 
  options: { } 
};
@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HomeComponent,
    DrawComponent,
    ListUsersComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [
    CookieService,
    SocketWebService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
