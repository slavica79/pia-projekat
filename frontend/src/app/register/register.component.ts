import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private servis: UserService) { }

  ngOnInit(): void {
    this.pageType = JSON.parse(localStorage.getItem("pageType")); // za ispis stranice
  }

  logout() {
    localStorage.clear();
  }

  pageType: string;
  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  passwordC: string = "";
  email: string = "";
  contact: string = "";
  organization: string = "";
  adress: string = "";
  regNumber: string = "";
  type: number = 0; //po defaultu participant
  organ: boolean = false;

  icon: string = "";
  imageCorrect: boolean = true;

  message: string = "";
  successMessage: string = ""


  register() {
    this.message = "";
    this.successMessage = "";
    if (this.firstname == "" || this.lastname == "" || this.username == "" || this.password == "" || this.passwordC == ""
      || this.contact == "" || this.email == "") {
      this.message = "You need to enter all wanted data in first section!";
      return;
    }

    const patternWord = /([a-zA-Z]).*/; // mora pocinjati slovom
    const patternCapital = /^.*[A-Z].*/; // bar jedno veliko
    const patternNumber = /^.*[0-9].*/; // bar jedna cifra
    const patternSpecial = /^.*[.!@#$%^&*].*/; // bar jedan specijalni karakter

    if (patternWord.exec(this.password) == null || patternCapital.exec(this.password) == null ||
      patternNumber.exec(this.password) == null || patternSpecial.exec(this.password) == null ||
      this.password.length < 8 || this.password.length > 16) {
      this.message = "The password is not in good format!";
      return;
    }

    if (this.password != this.passwordC) {
      this.message = "Password and confirmation must have same values!";
      return;
    }

    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(this.email))) {
      this.message = "Wrong email format!";
      return;
    }

    if (this.icon != "" && !this.imageCorrect) {
      this.message = "Image doesn't have valid format!";
      return;
    }

    if (this.organ && (this.organization == "" || this.adress == "" || this.regNumber == "")) {
      this.message = "You need to enter all wanted data for organization!";
      return;
    }
    if (this.organ) {
      this.type = 1;
      this.servis.registerUserOrganizer(this.firstname, this.lastname, this.username, this.password, this.contact, this.email, this.type, this.icon,
        this.adress, this.organization, this.regNumber).subscribe((resp => {
          if (resp['message'] == 'user added') {
            this.successMessage = "Registration successful! Wait for administrator to confirm!";
            return;
          }
          if (resp['message'] == 'user exist') {
            this.message = "There is already user with that username in the sistem!";
            return;
          }
          if (resp['message'] == 'email exist') {
            this.message = "You already have an account with that email!";
          }
          else {
            this.message = "There is a problem! Please, try again!";
          }
        }));
    }
    else {
      this.type = 0;
      this.servis.registerUserParticipant(this.firstname, this.lastname, this.username, this.password, this.contact, this.email, this.type, this.icon).subscribe((resp => {
        if (resp['message'] == 'user added') {
          this.successMessage = "Registration successful! Wait for administrator to confirm!";
          return;
        }
        if (resp['message'] == 'user exist') {
          this.message = "There is already user with that username in the sistem!";
          return;
        }
        if (resp['message'] == 'email exist') {
          this.message = "You already have an account with that email! Maybe refused!";
        }
        else {
          this.message = "There is a problem! Please, try again!";
        }
      }));
    }
  }

  onFileSelected(fileInput: any){
    this.icon = "";
    if (fileInput.target.files && fileInput.target.files[0]) {
      const min_height = 100;
      const min_width = 100;
      const max_height = 300;
      const max_width = 300;

      const reader = new FileReader();
      reader.onload = (e: any) => {

        const image = new Image();
        image.src = e.target.result;

        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          this.icon = e.target.result;
          this.icon.slice(21); // skida "data:image/png;base64"

          if (img_height > max_height || img_width > max_width || img_height < min_height || img_width < min_width) {
            this.imageCorrect = false;
          } else {
            this.imageCorrect = true;
          }

          console.log(this.icon);

          return true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true;
  }

}
