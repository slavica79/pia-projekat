import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participant } from '../models/participant';
import { Studio } from '../models/studio';
import { User } from '../models/user';
import { StudioService } from '../services/studio.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  constructor(private studioService: StudioService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    localStorage.setItem('pageType', JSON.stringify("organ"));
    this.user = JSON.parse(localStorage.getItem("user"));
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
        });
        this.studioService.getStudioIcons(s.name).subscribe(resp => {
          if(resp["images"]) {
            s.icons = resp["images"];
          }
          else {
            s.icons = null;
          }
        });
        if(this.user.username == s.user) {
          s.registration_requested.forEach(reg => {
            let part = new Participant();
            part.studio = s.name;
            part.user_email = reg.toString();
            this.participants.push(part);
          })

        }
      })
    });

  }

  stringAsDate(dateStr) {
    let date = new Date(dateStr);
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  logout() {
    localStorage.clear();
  }

  user: User;
  studios: Studio[] = [];
  participants: Participant[] = [];

  updateStudio(s) {
    localStorage.setItem('studioEdit', JSON.stringify(s));
    localStorage.setItem('pageType', JSON.stringify("organ"));
    this.router.navigate(['updateStudio']);
  }

  successMessage: string = "";
  message: string = "";

  // u requested_registration se nalaze neodobreni, ali i svuda ostalo, prihvatanje brisemo samo odatle, reject od svuda
  reject(p) {
    this.userService.getUserByMail(p.user_email).subscribe((user: User) => {
      console.log(user)
      if(user) {
        this.studioService.cancel(user.username, p.user_email, p.studio).subscribe(resp => {
          if (resp['message'] == 'success') {
            this.successMessage = "User " + p.user_email + " rejected for studio " + p.studio + "! Refresh page!";
            return;
          }
          else {
            this.message = "There is a problem! Please, try again!";
          }
        })
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    })
  }

  approve(p) {
    this.studioService.approve(p.user_email, p.studio).subscribe(resp => {
      if (resp['message'] == 'success') {
        this.successMessage = "User " + p.user_email + " approved for studio " + p.studio + "! Refresh page!";
        return;
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    })
  }

  saveJSON(s) {
    const obj = {
      "name": s.name,
      "date": s.date,
      "address":  s.address,
      "user": s.user,
      "description": s.description,
      "full_description": s.full_description,
      "icon": s.icon,
      "icons": s.icons,
      "free_spaces": s.free_spaces
    };

    const blob = new Blob([JSON.stringify(obj)], {type: "text/json"});
    const link = document.createElement("a");

    link.download = `template_${s.name}.json`;
    link.href = window.URL.createObjectURL(blob);
    link.dataset['downloadurl'] = ["text/json", link.download, link.href].join(":");

    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    });

    link.dispatchEvent(event);
    link.remove();
  }
}
