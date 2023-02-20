import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = `http://localhost:4000/admin`;

  getAllUsers() {
    return this.http.get(`${this.uri}/allUsers`);
  }

  getAllNotApprovedReq() {
    return this.http.get(`${this.uri}/allNotApprovedReq`);
  }

  getAllStudios() {
    return this.http.get(`${this.uri}/allStudios`);
  }

  getAllStudioSuggestions() {
    return this.http.get(`${this.uri}/allStudioSuggestions`);
  }

  approveRegistration(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/approveRegistration`, data);
  }

  refuseRegistration(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/refuseRegistration`, data);
  }

  deleteUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/deleteUser`, data);
  }

  //dodati id mozda u studio i po njemu brisati
  deleteStudio(name) {
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/deleteStudio`, data);
  }

  // odobravanje radionice
  approveStudio(username, name) {
    const data = {
      username: username,
      name: name
    }
    return this.http.post(`${this.uri}/approveStudio`, data);
  }


}
