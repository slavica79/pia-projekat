import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
      if (user) {
        if (user.type == 2) { //admin
          this.router.navigate(['/admin']);
        }
      }
      else {
        this.message = "Bad data!"; // ovo ispisuje i ako je istekla temporary pass
      }
    });
  }
}
