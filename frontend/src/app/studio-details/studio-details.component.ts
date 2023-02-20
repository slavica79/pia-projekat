import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chat } from '../models/chat';
import { Comment } from '../models/comment';
import { Message } from '../models/message';
import { Studio } from '../models/studio';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { CommentService } from '../services/comment.service';
import { StudioService } from '../services/studio.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-studio-details',
  templateUrl: './studio-details.component.html',
  styleUrls: ['./studio-details.component.css']
})
export class StudioDetailsComponent implements OnInit {

  constructor(private studioService: StudioService, private userService:UserService, private chatService: ChatService,
    private datePipe: DatePipe, private commentService: CommentService) {}

  ngOnInit(): void {
    this.studio = JSON.parse(localStorage.getItem('studio'));
    this.user = JSON.parse(localStorage.getItem("user"));

    this.studioService.getStudioIcons(this.studio.name).subscribe((resp) => {
      if(resp["images"]) {
        this.pictures = resp["images"];
        console.log(this.pictures);
      }
      else {
        this.pictures = null;
      }
    })

    this.chatService.getChatForStudioForUser(this.user.username, this.studio.name).subscribe((data: Chat) => {
      this.chat = data;
      if(data != null) {
        this.userService.getUserImage(this.chat.organizer).subscribe(resp => {
          if(resp["image"]) {
            this.chat.icon = resp["image"];
            this.organizer_icon = resp["image"];
          }
          else {
            this.chat.icon = null;
            this.organizer_icon = null;
          }
          this.messages = data.messages;
        })
      }
    });

    this.commentService.getAllCommentsForStudio(this.studio.name).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

  logout() {
    localStorage.clear();
  }

  stringAsDate(dateStr) {
    let date = new Date(dateStr);
    const time = this.datePipe.transform(date, 'hh:mm a');
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " "
      + time;
  }

  user: User;
  studio: Studio;
  chat: Chat;
  organizer_icon: string;
  messages: Message[] = [];

  pictures: string[] = [];

  comments: Comment[] = [];

  message: string = "";
  successMessage: string = "";

  apply() {
    this.message = "";
    this.successMessage = "";
    let exists = false;
    this.user.studios.forEach(s => {
      if(s == this.studio.name) {
        exists = true;
      }
    })
    if(exists) {
      this.message = "You are already aplied for this studio!"
    }
    else {
      this.studioService.apply(this.user.username, this.user.email, this.studio.name).subscribe(resp => {
        if (resp['message']=="success") {
          this.successMessage = "You have applied successfuly!";

          this.userService.getUser(this.user.username).subscribe((data: User) => {
            this.user = data;
            localStorage.setItem("user", JSON.stringify(data));
          })
        }
        else {
          this.message = "There is a problem! Please, try again!";
        }
      })
    }
  }

  informMe() {
    this.message = "";
    this.successMessage = "";

    let exists = false;
    this.studio.waiting_users.forEach(e => {
      if(e == this.user.email) {
        exists = true;
      }
    })
    if(exists) {
      this.message = "You are already aplied for this studio!"
    }
    else {
      this.studioService.inform(this.user.email, this.studio.name).subscribe(resp => {
        if (resp['message']=="success") {
          this.successMessage = "You have successfuly added on the list of waiting users!";
          this.studio.waiting_users.push(this.user.email);
        }
        else {
          this.message = "There is a problem! Please, try again!";
        }
      })
    }

  }

  msg: string = "";

  sendMsg() {
    if(this.msg == "") {
      return;
    }
    let now = new Date();
    this.chatService.sendMsg(this.user.username, this.studio.user, this.msg, this.studio.name, now).subscribe(resp => {
      if (resp['message']=="success") {
        this.chatService.getChatForStudioForUser(this.user.username, this.studio.name).subscribe((data: Chat) => {
          this.chat = data;
          if(data != null) {
            this.messages = data.messages;
          }
        })
        this.msg = "";
      }
    })
  }


  comm:string = "";

  comment() {
    if(this.comm == "") {
      return;
    }
    this.commentService.addComment(this.studio.name, this.user.username, this.comm).subscribe(resp => {
      if (resp['message']=="success") {
        this.commentService.getAllCommentsForStudio(this.studio.name).subscribe((data: Comment[]) => {
          this.comments = data;
        })
        this.comm = "";
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    })
  }

  like() {
    this.message = "";
    this.successMessage = "";
    let alreadyLiked = false;
    this.user.likes.forEach(l => {
      if(l == this.studio.name) {
        alreadyLiked = true;
      }
    })
    if(alreadyLiked) {
      this.message = "You have already liked this studio!";
      return;
    }
    else {
      this.studioService.like(this.user.username, this.studio.name).subscribe(resp => {
        if (resp['message']=="success") {
          this.successMessage = "Studio liked!";

          // mora se ponovo dohvatiti user iz baze sa novim lajkovima i staviti u localStorage on
          this.userService.getUser(this.user.username).subscribe((data: User) => {
            this.user = data;
            localStorage.setItem("user", JSON.stringify(data));
          })
          this.studioService.getStudio(this.studio.name).subscribe((data:Studio) => {
            this.studio = data;
            localStorage.setItem('studio', JSON.stringify(data));
          })
        }
        else {
          this.message = "There is a problem! Please, try again!";
        }
      })
    }
  }
}
