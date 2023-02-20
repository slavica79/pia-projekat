import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  username: string = "";
  password: string = "";

  message: string = "";

  login() {
    if (this.username == "" || this.password == "") {
      this.message = "You need to enter all wanted data!";
      return;
    }
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if (user && user.type != 2) {
        this.userService.getUserImage(user.username).subscribe(resp => {
          if(resp["image"]) {
            user.icon = resp["image"];
          }
          else {
            user.icon = null;
          }
          localStorage.setItem('user', JSON.stringify(user));
        })

        if(user.status == "") {
          this.message = "Admin has not approved your registration yet!";
          return;
        }
        if(user.status == "neaktivan") {
          this.message = "Your registration has been refused!";
          return;
        }
        if (user.type == 0) { //ucesnik
          this.router.navigate(['/participant']);
        }
        else if (user.type == 1) { //organizator
          this.router.navigate(['/organizer']);
        } /*else if (user.type == 2) { //admin
          this.router.navigate(['/admin']);
        }*/
      }
      else {
        this.message = "Bad data!"; // ovo ispisuje i ako je istekla temporary pass
      }
    });
  }
}
