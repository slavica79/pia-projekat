import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../models/chat';
import { Comment } from '../models/comment';
import { Studio } from '../models/studio';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { CommentService } from '../services/comment.service';
import { StudioService } from '../services/studio.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})
export class ParticipantProfileComponent implements OnInit {

  constructor(private router: Router, private studioService: StudioService, private commentService: CommentService,
    private userService: UserService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    let today = new Date();
    this.user.studios.forEach(st => {

      this.studioService.getStudio(st).subscribe((studio: Studio) => {
        let dat = new Date(studio.date);
        // samo kojima je vec prisustvovao
        //if(dat < today) {
          this.studioService.getStudioMainIcon(studio.name).subscribe(resp => {
            if(resp["image"]) {
              studio.icon = resp["image"];
            }
            else {
              studio.icon = null;
            }
            this.studios.push(studio);
          })
        //}
      });

      this.chatService.getAllChatsForUser(this.user.username).subscribe((data: Chat[]) => {
        this.chats = data;

        this.chats.forEach(c => {
          this.userService.getUserImage(c.organizer).subscribe(resp => {
            if(resp["image"]) {
              c.icon = resp["image"];
            }
            else {
              c.icon = null;
            }
          })
        })
      })

    })

    this.user.likes.forEach(st => {

      this.studioService.getStudio(st).subscribe((studio: Studio) => {
        this.studioService.getStudioMainIcon(studio.name).subscribe(resp => {
          if(resp["image"]) {
            studio.icon = resp["image"];
          }
          else {
            studio.icon = null;
          }
          this.likedStudios.push(studio);
        })
      });
    })

    this.commentService.getAllCommentsForUser(this.user.username).subscribe((comments: Comment[]) => {
      this.commentedStudios = comments;

      this.commentedStudios.forEach(c => {
        this.studioService.getStudioMainIcon(c.studio).subscribe(resp => {
          if(resp["image"]) {
            c.icon = resp["image"];
          }
          else {
            c.icon = null;
          }
        })
      })
    })
  }

  studios: Studio[] = [];
  likedStudios: Studio[] = [];
  commentedStudios: Comment[] = [];

  chats: Chat[] = [];

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

  stringAsDate(dateStr) {
    let date = new Date(dateStr);
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  user: User;

  logout() {
    localStorage.clear();
  }

  update(u) {
    localStorage.setItem('userEdit', JSON.stringify(u));
    localStorage.setItem('pageType', JSON.stringify("user"));
    this.router.navigate(['updateProfile']);
  }

  sortStudiosByAddress() {
    this.studios.sort((a , b)=>{
      const adrA = a.address.toUpperCase(); // ignoring upper and lowercase
      const adrB = b.address.toUpperCase();
      if(adrA < adrB) {
        return -1;
      }
      if(adrA > adrB) {
          return 1;
      }
      return 0;
    });
  }

  sortStudiosByName() {
    this.studios.sort((a , b)=>{
      const nameA = a.name.toUpperCase(); // ignoring upper and lowercase
      const nameB = b.name.toUpperCase();
      if(nameA < nameB) {
        return -1;
      }
      if(nameA > nameB) {
          return 1;
      }
      return 0;
    });
  }

  sortStudiosByDate() {
    this.studios.sort((a , b)=>{
      let first = new Date(a.date);
      let second = new Date(b.date);
      if(first < second) {
        return -1;
      } else {
        if(first == second) {
          return 0;
        }
        else {
          return 1;
        }
      }
    });
  }

  message: string = "";
  successMessage: string = "";

  dislike(s) {
    this.studioService.dislike(this.user.username, s.name).subscribe(resp => {
      if (resp['message']=="success") {
        this.successMessage = "Studio " + s.name + " disliked!";

        // mora se ponovo dohvatiti user iz baze sa novim lajkovima i staviti u localStorage on
        this.likedStudios = [];
        this.userService.getUser(this.user.username).subscribe((data: User) => {
          this.user = data;
          localStorage.setItem("user", JSON.stringify(data));

          this.user.likes.forEach(st => {

            this.studioService.getStudio(st).subscribe((studio: Studio) => {
                this.likedStudios.push(studio);
            });
          })
        })
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    })
  }

  deleteComment(com) {
    this.commentService.deleteComment(com._id).subscribe(resp => {
      if (resp['message']=="Comment deleted") {
        this.successMessage = "Comment " + com.comment + " deleted!";
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    })
    this.commentService.getAllCommentsForUser(this.user.username).subscribe((comments: Comment[]) => {
      this.commentedStudios = comments;
    })
  }

  text: string = "";

  updateComment(com) {

    this.message = "";
    this.successMessage = "";

    if(this.text == "") {
      this.message = "You need to enter text of the comment!";
      return;
    }

    this.commentService.updateComment(com._id, this.text).subscribe(resp => {
      if (resp['message']=="success") {
        this.successMessage = "Comment " + com.comment + " updated to " + this.text;
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    })
    this.commentService.getAllCommentsForUser(this.user.username).subscribe((comments: Comment[]) => {
      this.commentedStudios = comments;
    })
  }


}
