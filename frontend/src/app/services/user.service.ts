import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = `http://localhost:4000/users`;

  login(username, password) {
    //zahtev ka backend-u
    const data={
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  registerUserOrganizer(firstname, lastname, username, password, contact, email, type, icon, org_adress, org_name, org_number) {
    const data={
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      contact: contact,
      email: email,
      type: type,
      status: "", // prilikom unosa status prazan string i tako znamo koga dovlacimo adminu
      icon: icon,
      org_adress: org_adress,
      org_name: org_name,
      org_number: org_number
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  registerUserParticipant(firstname, lastname, username, password, contact, email, type, icon) {
    const data={
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      contact: contact,
      email: email,
      type: type,
      status: "", // prilikomm unosa status prazan string i tako znamo koga dovlacimo adminu
      icon: icon,
      org_adress: null,
      org_name: null,
      org_number: null
    }
    // deo za organizaciju je null ako je obican ucesnik

    return this.http.post(`${this.uri}/register`, data);
  }

  changePassword(username, password){
    const data = {
      username: username,
      newPassword: password
    }
    return this.http.post(`${this.uri}/changePassword`, data);
  }

  updateUser(firstname, lastname, username, contact, email, icon) {
    const data={
      firstname: firstname,
      lastname: lastname,
      username: username,
      contact: contact,
      email: email,
      icon: icon
    }
    // deo za organizaciju je null ako je obican ucesnik

    return this.http.post(`${this.uri}/update`, data);
  }

  getUser(username) {
    return this.http.get(`${this.uri}/getUser?username=${username}`);
  }

  getUserImage(username) {
    return this.http.get(`${this.uri}/getUserImage?username=${username}`);
  }

  getUserByMail(email) {
    return this.http.get(`${this.uri}/getUserByMail?email=${email}`);
  }
}
