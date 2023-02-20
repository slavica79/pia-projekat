import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private servis: UserService) { }

  ngOnInit(): void {
    this.userEdit = JSON.parse(localStorage.getItem("userEdit"));
    this.pageType = JSON.parse(localStorage.getItem("pageType")); // za ispis stranice

    this.username = this.userEdit.username;
    this.firstname = this.userEdit.firstname;
    this.lastname = this.userEdit.lastname;
    this.email = this.userEdit.email;
    this.contact = this.userEdit.contact;
  }

  logout() {
    localStorage.clear();
  }

  userEdit: User;
  pageType: string;
  username: string = "";

  firstname: string = "";
  lastname: string = "";
  email: string = "";
  contact: string = "";

  icon: string = "";
  imageCorrect: boolean = true;

  message: string = "";
  successMessage: string = ""


  update() {
    this.message = "";
    this.successMessage = "";
    if (this.firstname == "" || this.lastname == "" || this.username == "" || this.contact == "" || this.email == "") {
      this.message = "You need to enter all wanted data in first section!";
      return;
    }

    if (this.icon != "" && !this.imageCorrect) {
      this.message = "Image doesn't have valid format!";
      return;
    }

    this.servis.updateUser(this.firstname, this.lastname, this.username, this.contact, this.email, this.icon)
    .subscribe((resp => {
        if (resp['message'] == "success") {
          this.successMessage = "Update successful!";
          return;
        }
        else {
          this.message = "There is a problem! Please, try again!";
        }
      }));
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
