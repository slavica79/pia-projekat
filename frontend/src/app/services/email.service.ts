import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  uri = `http://localhost:4000`;

  sendMessage(email) {
    let data = {
      email: email,
      randomstring: (Math.random() + 1).toString(36).slice(-8) // generise random string za sifru
    }
    return this.http.post(`${this.uri}/forgotPassword`, data);
  }
}
