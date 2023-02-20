import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

  constructor(private http: HttpClient) { }

  uri = `http://localhost:4000/studios`;


  //unregistered

  getAllCurrentStudios() {
    return this.http.get(`${this.uri}/allCurrentStudios`);
  }

  getAllStudiosForOrganizer(user) {
    return this.http.get(`${this.uri}/getAllStudiosForOrganizer?user=${user}`);
  }

  getTop5Studios() {
    return this.http.get(`${this.uri}/top5Studios`);
  }

  searchStudiosByName(searchParam1) {
    return this.http.get(`${this.uri}/searchStudiosName?param1=${searchParam1}`);
  }

  searchStudiosByPlace(searchParam2) {
    return this.http.get(`${this.uri}/searchStudiosPlace?param2=${searchParam2}`);
  }

  searchStudiosByNameAndPlace(searchParam1, searchParam2) {
    return this.http.get(`${this.uri}/searchStudiosNameAndPlace?param1=${searchParam1}&param2=${searchParam2}`);
  }

  getStudio(name) {
    return this.http.get(`${this.uri}/getStudio?name=${name}`);
  }

  like(username, studio) {
    const data = {
      username: username,
      studio: studio
    }
    return this.http.post(`${this.uri}/like`, data);
  }

  dislike(username, studio) {
    const data = {
      username: username,
      studio: studio
    }
    return this.http.post(`${this.uri}/dislike`, data);
  }

  cancel(username, mail, studio) {
    const data = {
      username: username,
      user_email: mail,
      studio: studio
    }
    return this.http.post(`${this.uri}/cancel`, data);
  }

  approve(user_email, studio) {
    const data = {
      user_email: user_email,
      studio: studio
    }
    return this.http.post(`${this.uri}/approve`, data);
  }

  apply(username, mail, studio) {
    const data = {
      username: username,
      user_email: mail,
      studio: studio
    }
    return this.http.post(`${this.uri}/apply`, data);
  }

  inform(mail, studio) {
    const data = {
      user_email: mail,
      studio: studio
    }
    return this.http.post(`${this.uri}/addToListOfWaitingUsers`, data);
  }

  create(name, date, description, full_description, user, address, free_spaces, icon, icons) {
    const data = {
      name: name,
      date: date,
      description: description,
      full_description: full_description,
      likes: 0,
      approved: false,
      user: user,
      address: address,
      free_spaces: free_spaces,
      icon: icon,
      icons: icons
    };
    return this.http.post(`${this.uri}/create`, data);
  }

  update(name, date, description, full_description, user, address, free_spaces, icon, icons) {
    const data = {
      name: name,
      date: date,
      description: description,
      full_description: full_description,
      address: address,
      free_spaces: free_spaces,
      icon: icon,
      icons: icons
    };
    return this.http.post(`${this.uri}/update`, data);
  }

  getStudioMainIcon(studio) {
    return this.http.get(`${this.uri}/getStudioMainIcon?studio=${studio}`);
  }

  getStudioIcons(studio) {
    return this.http.get(`${this.uri}/getStudioIcons?studio=${studio}`);
  }

}
