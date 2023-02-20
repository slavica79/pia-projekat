import { Component, OnInit } from '@angular/core';
import { Studio } from '../models/studio'
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//unregistered user; home page
export class HomeComponent implements OnInit{

  constructor(private studioService: StudioService) { }

  ngOnInit(): void {
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
        })
      })
    });
    this.studioService.getTop5Studios().subscribe((data: Studio[]) => {
      this.studiosTop5= data;

      this.studiosTop5.forEach(s => {
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
  }

  studios: Studio[] = [];
  studiosTop5: Studio[] = [];

  searchParam1: string = "";
  searchParam2: string = "";

  stringAsDate(dateStr) {
    let date = new Date(dateStr);
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  searchByName() {
    this.studioService.searchStudiosByName(this.searchParam1).subscribe((data: Studio[]) => {
      this.studios = data;
    })
  }

  searchByPlace() {
    this.studioService.searchStudiosByPlace(this.searchParam2).subscribe((data: Studio[]) => {
      this.studios = data;
    })
  }

  searchByNameAndPlace() {
    this.studioService.searchStudiosByNameAndPlace(this.searchParam1, this.searchParam2).subscribe((data: Studio[]) => {
      this.studios = data;
    })
  }

  sortStudiosByDate() {
    this.studios.sort((a , b)=>{
      let first = new Date(a.date);
      let second = new Date(b.date);
      if(first < second) {
        return -1;
      } else {
        if(first == second) {
          return 0;
        }
        else {
          return 1;
        }
      }
    });
  }

  sortStudiosByName() {
    this.studios.sort((a , b)=>{
      const nameA = a.name.toUpperCase(); // ignoring upper and lowercase
      const nameB = b.name.toUpperCase();
      if(nameA < nameB) {
        return -1;
      }
      if(nameA > nameB) {
          return 1;
      }
      return 0;
    });
  }

}
