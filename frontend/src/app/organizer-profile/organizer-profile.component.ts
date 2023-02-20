import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../models/chat';
import { Message } from '../models/message';
import { Studio } from '../models/studio';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { StudioService } from '../services/studio.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent implements OnInit {

  constructor(private router: Router, private studioService: StudioService, private chatService: ChatService,
      private userService: UserService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.studioService.getAllStudiosForOrganizer(this.user.username).subscribe((data: Studio[]) => {
      this.studios = data;

      this.studios.forEach(s => {
        this.studioService.getStudioMainIcon(s.name).subscribe(resp => {
          if(resp["image"]) {
            s.icon = resp["image"];
          }
          else {
            s.icon = null;
          }
        })
      })
    })
  }

  user: User;
  studios: Studio[] = [];

  logout() {
    localStorage.clear();
  }

  stringAsDate(dateStr) {
    let date = new Date(dateStr);
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  stringAsDateTime(dateStr) {
    let date = new Date(dateStr);
    const time = this.datePipe.transform(date, 'hh:mm a');
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " "
      + time;
  }

  getType(type) {
    if (type == 0) {
      return "ucesnik";
    }
    else if (type == 1) {
      return "organizator"
    }
    else if (type == 2) {
      return "admin"
    }
    return "error";
  }

  update(u) {
    localStorage.setItem('userEdit', JSON.stringify(u));
    localStorage.setItem('pageType', JSON.stringify("user"));
    this.router.navigate(['updateProfile']);
  }

  studio: Studio;
  chats: Chat[] = [];
  people: String[] = [];
  icon: string = "";
  active: string = "";
  messages: Message[] = [];

  openChats(s) {
    this.studio = s;
    this.people = [];
    this.messages = [];
    this.active = "";
    this.icon = "";
    this.chatService.getChatsForStudio(s.name).subscribe((data: Chat[]) => {
      this.chats = data;

      this.chats.forEach(c => {
        this.people.push(c.participant)
      })
    })
  }

  showMsg(p) {
    this.messages = [];
    this.active = p;
    this.chatService.getChatForStudioForUser(p, this.studio.name).subscribe((data: Chat) => {
      this.userService.getUserImage(p).subscribe(resp => {
        if(resp["image"]) {
          this.icon = resp["image"];
        }
        else {
          this.icon = null;
        }
      })
      if(data != null) {
        this.messages = data.messages;
      }
    });
  }

  msg: string = "";

  sendMsg() {
    if(this.msg == "") {
      return;
    }
    let now = new Date();
    this.chatService.sendMsgFromOrganizer(this.active, this.user.username, this.msg, this.studio.name, now).subscribe(resp => {
      if (resp['message']=="success") {
        this.chatService.getChatForStudioForUser(this.active, this.studio.name).subscribe((data: Chat) => {
          if(data != null) {
            this.messages = data.messages;
          }
        });
        this.msg = "";
      }
    })
  }
}
