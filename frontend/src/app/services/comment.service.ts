import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  uri = `http://localhost:4000/comments`;


  getAllCommentsForUser(user) {
    return this.http.get(`${this.uri}/getAllCommentsForUser?user=${user}`);
  }

  getAllCommentsForStudio(studio) {
    return this.http.get(`${this.uri}/getAllCommentsForStudio?studio=${studio}`);
  }

  deleteComment(id) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/deleteComment`, data);
  }

  updateComment(id, text) {
    const data = {
      id: id,
      comment: text,
      date: new Date()
    }
    return this.http.post(`${this.uri}/updateComment`, data);
  }

  addComment(studio, user, comment) {
    const data = {
      studio: studio,
      user: user,
      comment: comment,
      date: new Date()
    }
    return this.http.post(`${this.uri}/addComment`, data);
  }

}
