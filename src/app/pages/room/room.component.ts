import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room!: any;
  nickname!: string;

  constructor(
    private router: ActivatedRoute,
    private cookieService: CookieService,
    private socketWebService: SocketWebService
  ){}

  ngOnInit(): void {
    this.room = this.router.snapshot.paramMap.get('room');
    this.cookieService.set('room', this.room);

    this.socketWebService.getUserLogged.subscribe((user) => {
      this.nickname = user;
    })
  }
}
