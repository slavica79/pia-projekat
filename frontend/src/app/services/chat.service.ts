import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  uri = `http://localhost:4000/chats`;


  getChatForStudioForUser(username, studio) {
    return this.http.get(`${this.uri}/getChatForStudioForUser?username=${username}&studio=${studio}`);
  }

  sendMsg(participant, organizer, msg, studio, now) {
    const data = {
      from: participant,
      participant: participant,
      organizer: organizer,
      msg: msg,
      studio: studio,
      date: now
    }
    return this.http.post(`${this.uri}/sendMsg`, data);
  }

  sendMsgFromOrganizer(participant, organizer, msg, studio, now) {
    const data = {
      from: organizer,
      participant: participant,
      organizer: organizer,
      msg: msg,
      studio: studio,
      date: now
    }
    return this.http.post(`${this.uri}/sendMsg`, data);
  }

  getAllChatsForUser(username) {
    return this.http.get(`${this.uri}/getAllChatsForUser?username=${username}`);
  }

  getChatsForStudio(studio) {
    return this.http.get(`${this.uri}/getChatsForStudio?studio=${studio}`);
  }
}
