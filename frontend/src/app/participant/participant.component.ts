import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Studio } from '../models/studio';
import { User } from '../models/user';
import { StudioService } from '../services/studio.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  constructor(private studioService: StudioService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    let today = new Date();
    this.user.studios.forEach(st => {

      this.studioService.getStudio(st).subscribe((studio: Studio) => {
        let dat = new Date(studio.date);
        // samo kojima ce tek prisustvovati
        if (dat >= today) {
          this.studioService.getStudioMainIcon(studio.name).subscribe(resp => {
            if(resp["image"]) {
              studio.icon = resp["image"];
            }
            else {
              studio.icon = null;
            }
            this.registeredStudios.push(studio);
          })
        }
      });
    })

    this.studioService.getAllCurrentStudios().subscribe((data: Studio[]) => {
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
    });
  }

  user: User;
  registeredStudios: Studio[] = [];

  logout() {
    localStorage.clear();
  }

  stringAsDate(dateStr) {
    let date = new Date(dateStr);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  checkTime(dateStr) {
    let date = new Date(dateStr);
    let today = new Date();
    const timeDiffHours = Math.abs(date.getTime() - today.getTime()) / 36e5;
    if (timeDiffHours < 12) {
      return false;
    }
    else {
      return true;
    }
  }

  message: string;
  successMessage: string;

  cancel(st) {
    this.message = "";
    this.successMessage = "";
    this.studioService.cancel(this.user.username, this.user.email, st.name).subscribe(resp => {
      if (resp['message'] == "success") {
        this.successMessage = "Studio " + st.name + " canceled!";

        this.registeredStudios = [];
        this.userService.getUser(this.user.username).subscribe((data: User) => {
          this.user = data;
          localStorage.setItem("user", JSON.stringify(data));

          let today = new Date();
          this.user.studios.forEach(st => {
            this.studioService.getStudio(st).subscribe((studio: Studio) => {
              let dat = new Date(studio.date);
              // samo kojima ce tek prisustvovati
              if (dat >= today) {
                this.registeredStudios.push(studio);
              }
            });
          })
        })
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    })
  }

  studios: Studio[] = [];

  details(s) {
    localStorage.setItem('studio', JSON.stringify(s));
    this.router.navigate(['studioDetails']);
  }


}
