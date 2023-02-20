import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Studio } from '../models/studio';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { StudioService } from '../services/studio.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router, private userService: UserService,
    private studioService: StudioService) { }

  ngOnInit(): void {
    this.adminService.getAllStudios().subscribe((data: Studio[]) => {
      this.allStudios = data;

      this.allStudios.forEach(s => {
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
    this.adminService.getAllStudioSuggestions().subscribe((data: Studio[]) => {
      this.allStudioSuggestions= data;

      this.allStudioSuggestions.forEach(s => {
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
    this.adminService.getAllUsers().subscribe((data: User[]) => {
      this.allUsers= data;

      this.allUsers.forEach(u => {
        this.userService.getUserImage(u.username).subscribe(resp => {
          if(resp["image"]) {
            u.icon = resp["image"];
          }
          else {
            u.icon = null;
          }
        })
      })
    });
    this.adminService.getAllNotApprovedReq().subscribe((data: User[]) => {
      this.allNotApprovedReq= data;
      this.allNotApprovedReq.forEach(u => {
        this.userService.getUserImage(u.username).subscribe(resp => {
          if(resp["image"]) {
            u.icon = resp["image"];
          }
          else {
            u.icon = null;
          }
        })
      })
    });
  }

  logout() {
    localStorage.clear();
  }

  allStudios: Studio[] = [];
  allStudioSuggestions: Studio[] = [];

  allUsers: User[] = [];
  allNotApprovedReq: User[] = [];

  message1: string = "";
  successMessage1: string = "";

  message2: string = "";
  successMessage2: string = "";

  stringAsDate(dateStr) {
    let date = new Date(dateStr);
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
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

  approve(u) {
    this.adminService.approveRegistration(u.username).subscribe(resp => {
      if (resp['message']=='success') {
        this.successMessage2 = "User " + u.username + " approved!";
      }
      else {
        this.successMessage2 = "There is a problem! Please, try again!";
      }
    });
  }

  refuse(u) {
    this.adminService.refuseRegistration(u.username).subscribe(resp => {
      if (resp['message']=='success') {
        this.successMessage2 = "User " + u.username + " refused!";
      }
      else {
        this.message2 = "There is a problem! Please, try again!";
      }
    });
  }

  updateUser(u) {
    localStorage.setItem('userEdit', JSON.stringify(u));
    localStorage.setItem('pageType', JSON.stringify("admin"));
    this.router.navigate(['updateProfile']);
  }

  deleteUser(u) {
    this.adminService.deleteUser(u.username).subscribe(resp => {
      if (resp['message']=='User deleted') {
        this.successMessage1 = "User " + u.username + " deleted!";
      }
      else {
        this.message1 = "There is a problem! Please, try again!";
      }
    });
  }

  message3: string = "";
  successMessage3: string = "";

  updateStudio(s) {
    localStorage.setItem('studioEdit', JSON.stringify(s));
    localStorage.setItem('pageType', JSON.stringify("admin"));
    this.router.navigate(['updateStudio']);
  }

  deleteStudio(s) {
    this.message3 = "";
    this.successMessage3 = "";
    this.adminService.deleteStudio(s.name).subscribe(resp => {
      if (resp['message']=='Studio deleted') {
        this.successMessage3 = "Studio " + s.name + " deleted!";
      }
      else {
        this.message3 = "There is a problem! Please, try again!";
      }
    });
  }

  approveStudio(s) {
    // тај учесник не сме да има тренутно актуелне пријаве за неку текућу радионицу
    this.message3 = "";
    this.successMessage3 = "";
    let approveS = true;
    this.userService.getUser(s.user).subscribe((user:User) => {
      if (user) {
        // user.studios lista stringova
        if(user.type == 0) {
          console.log(user.studios);
          var bar = new Promise((resolve, reject) => {
            user.studios.forEach(st => {
              this.studioService.getStudio(st).subscribe((studio: Studio) => {
                console.log(studio);
                if(studio.date >= s.date) {
                  this.message3 = "Can't approve studio suggestion of participant who has applied for some upcoming studios!";
                  approveS = false;
                  return;
                }
              });
            });
          });
        }
        bar.then(() => {
          if(approveS) {
            this.adminService.approveStudio(s.user, s.name).subscribe(resp => {
              if (resp['message']=="success") {
                this.successMessage3 = "Studio " + s.name + " approved!";
              }
              else {
                this.message3 = "There is a problem! Please, try again!";
              }
            })
          }
        })
      }
      else {
        this.message3 = "User doesn't exist!";
      }
    });

  }
  // ako je refuseStudio odmah se brise

  addNewUser() {
    localStorage.setItem('pageType', JSON.stringify("admin"));
    this.router.navigate(['register']);
  }

  addNewStudio() {
    localStorage.setItem('pageType', JSON.stringify("admin"));
    this.router.navigate(['becomeOrganizer']);
  }


}
