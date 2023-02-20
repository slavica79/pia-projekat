import { Component, OnInit } from '@angular/core';
import { Studio } from '../models/studio';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'app-update-studio',
  templateUrl: './update-studio.component.html',
  styleUrls: ['./update-studio.component.css']
})
export class UpdateStudioComponent implements OnInit {

  constructor(private studioService: StudioService) {}

  ngOnInit(): void {
    this.studio = JSON.parse(localStorage.getItem("studioEdit"));
    this.pageType = JSON.parse(localStorage.getItem("pageType"));

    this.studioService.getStudioMainIcon(this.studio.name).subscribe(resp=> {
      if(resp["image"]) {
        this.studio.icon = resp["image"];
        this.icon = resp["image"];
      }
      else {
        this.studio.icon = null;
        this.icon = null;
      }

      this.studioService.getStudioIcons(this.studio.name).subscribe(resp=> {
        if(resp["images"]) {
          this.studio.icons = resp["images"];
          this.icons = resp["images"];
          this.deleteImage(this.icon);
        }
        else {
          this.studio.icons = null;
          this.icons = null;
        }
      })
    })

    this.date = new Date(this.studio.date).toISOString().substring(0, 10);
    this.time = new Date(this.studio.date).toISOString().substring(11, 16);
  }

  studio: Studio;
  pageType: string = "";

  message: string;
  successMessage: string;

  date: string;
  time: string;
  icon:string;

  logout() {
    localStorage.clear();
  }

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

          console.log(this.icon);

          return true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true;
  }

  update() {
    this.message = "";
    this.successMessage = "";
    console.log(this.icon)
    if (this.studio.name == "" || this.studio.address == "" || this.studio.description == "" || this.studio.full_description == ""
      || this.date == "" || this.time == "" || this.icon == "") {
      this.message = "You need to enter all wanted data!";
      return;
    }

    this.icon = this.icon.slice(21);
    for(let i = 0; i < this.icons.length; i++) {
      this.icons[i] = this.icons[i].slice(21);
    }
    console.log(this.icon);

    const dateObj = new Date(`${this.date}T${this.time}`);

    this.studioService.update(this.studio.name, dateObj, this.studio.description, this.studio.full_description, this.studio.user,
        this.studio.address, this.studio.free_spaces, this.icon, this.icons).subscribe((resp => {
        if (resp['message'] == 'success') {
          this.successMessage = "Studio successfuly added! Wait for administrator to approve!";
          return;
        }
        else {
          this.message = "There is a problem! Please, try again!";
        }
    }));
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
}
