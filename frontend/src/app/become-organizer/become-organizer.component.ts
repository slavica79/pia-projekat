import { Component, OnInit } from '@angular/core';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'app-become-organizer',
  templateUrl: './become-organizer.component.html',
  styleUrls: ['./become-organizer.component.css']
})
export class BecomeOrganizerComponent implements OnInit {

  constructor(private studioService: StudioService) {}

  ngOnInit(): void {
    this.pageType = JSON.parse(localStorage.getItem("pageType"));
  }

  pageType: string = "";

  logout() {
    localStorage.clear();
  }

  message: string;
  successMessage: string;

  name:string = "";
  address: string = "";
  date: string = "";
  time: string = "";
  desc:string = "";
  fullDesc:string = "";
  username: string = "";
  free_spaces: number = 0;

  icon:string;

  onFileSelected(fileInput: any){
    this.icon = "";
    if (fileInput.target.files && fileInput.target.files[0]) {

      const reader = new FileReader();
      reader.onload = (e: any) => {

        const image = new Image();
        image.src = e.target.result;

        image.onload = (rs) => {

          this.icon = e.target.result;
          //this.icon.slice(19);

          return true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true;
  }

  icons: string[] = []

  onFileSelectedMultiple(fileInput: any) {
    if (fileInput.target.files) {
      let i = this.icons.length;
      for(let f of fileInput.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;

          image.onload = (rs) => {

            this.icons[i] = e.target.result;
            //this.icons[i].slice(19);
            i++;
            return true;
          };
        }
        reader.readAsDataURL(f);

      };
    }
    return true;
  }

  // klikom na sliku brise se iz niza za slanje
  deleteImage(p) {
    let temp = [];
    this.icons.forEach(i => {
      if(i != p) {
        temp.push(i)
      }
    })
    this.icons = temp;
  }

  create() {
    this.message = "";
    this.successMessage = "";
    console.log(this.icon)
    if (this.name == "" || this.address == "" || this.desc == "" || this.fullDesc == "" || this.date == "" || this.time == "" || this.icon == "") {
      this.message = "You need to enter all wanted data!";
      return;
    }
    this.icon = this.icon.slice(21);
    for(let i = 0; i < this.icons.length; i++) {
      this.icons[i] = this.icons[i].slice(21);
    }
    console.log(this.icon);

    const dateObj = new Date(`${this.date}T${this.time}`);
    console.log(dateObj);

    this.studioService.create(this.name, dateObj, this.desc, this.fullDesc, this.username,this.address, this.free_spaces, this.icon, this.icons).subscribe((resp => {
        if (resp['message'] == 'studio added') {
          this.successMessage = "Studio successfuly added! Wait for administrator to approve!";
          return;
        }
        else {
          this.message = "There is a problem! Please, try again!";
        }
    }));
  }

  insertTemplate(fileInput: any) {
    if(fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const temp = JSON.parse(e.target.result);
        this.icon = temp.icon;
        this.icons = temp.icons;
        this.deleteImage(this.icon); // jer se u icons nalazi i main picture
        this.name = temp.name;
        this.address = temp.address;
        this.date = new Date(temp.date).toISOString().substring(0, 10);
        this.time = new Date(temp.date).toISOString().substring(11, 16);
        this.desc = temp.description;
        this.fullDesc = temp.full_description;
        this.username = temp.user;
        this.free_spaces = temp.free_spaces;
      }

      reader.readAsText(fileInput.target.files[0]);
    }
  }
}
