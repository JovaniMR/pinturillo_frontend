import { Component, OnInit } from '@angular/core';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  
  listUsers: Array<string> = [];
  constructor(private socketWebService: SocketWebService){}

  ngOnInit(): void {
    this.socketWebService.newUserConnected.subscribe(users => {
      this.listUsers = users;
    })
  }
}
