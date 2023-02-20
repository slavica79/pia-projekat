import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private userService: UserService, private router:Router, private emailService: EmailService) { }

  ngOnInit(): void {

  }

  email: string = "";

  message: string = "";
  successMessage: string = "";

  sendMail() {
    this.message = "";
    this.successMessage = "";
    if (this.email == "") {
      this.message = "You need to enter your email!";
      return;
    }
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(this.email))) {
      this.message = "Wrong email format!";
      return;
    }

    this.emailService.sendMessage(this.email).subscribe(resp => {
      if (resp['message']=='success') {
        this.successMessage = "Mail has been sent to your email adress!"
      }
      else {
        this.message = "There is a problem! Please, try again!";
      }
    })
  }
}
