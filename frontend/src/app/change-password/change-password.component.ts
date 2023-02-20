import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // vec u localStorage imam user iz login-a
    this.user = JSON.parse(localStorage.getItem("user"));
    this.pageType = JSON.parse(localStorage.getItem("pageType"));
  }

  logout() {
    localStorage.clear();
  }

  user: User;

  pageType: string;

  old: string = "";
  password: string = "";
  passwordC: string = "";

  message: string = "";
  successMessage: string = "";

  change() {
    this.message = "";
    this.successMessage = "";
    if(this.password == "" || this.passwordC == "" || this.old == "") {
      this.message = "You need to enter all wanted data!";
      return;
    }

    const patternWord = /([a-zA-Z]).*/; // mora pocinjati slovom
    const patternCapital = /^.*[A-Z].*/; // bar jedno veliko
    const patternNumber = /^.*[0-9].*/; // bar jedna cifra
    const patternSpecial = /^.*[!, @, #, $, %].*/; // bar jedan specijalni karakter

    if (patternWord.exec(this.password) == null || patternCapital.exec(this.password) == null ||
      patternNumber.exec(this.password) == null || patternSpecial.exec(this.password) == null ||
      this.password.length < 8 || this.password.length > 16) {
      this.message = "The password is not in good format!";
      return;
    }

    if(this.password != this.passwordC) {
      this.message = "Password and confirmation must have same values!";
      return;
    }
    if(this.user.password != this.old) {
      this.message = "Wrong old password!";
      return;
    }
    this.userService.changePassword(this.user.username, this.password).subscribe(resp => {
      if (resp['message']=='success') {
        this.successMessage = "Password changed!";
        this.user.password = this.password;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.clear();
        this.router.navigate(['/login']); // vratiti korisnika na pocetni ekran za prijavljivanje
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    });
  }
}
