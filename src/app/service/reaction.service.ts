import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './userService';
import {Reaction} from '../model/reaction';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {


  private apiUrl = 'http://localhost:8080/WS_PROJECT_DISCORD_war_exploded/reaction';

  constructor(private http: HttpClient) { }

  addReaction(messageId: number, userId: number, reaction: string) {
    const n_reaction = new Reaction(reaction, userId, messageId);
    return this.http.post(`${this.apiUrl}/add`, n_reaction, { headers: UserService.getHeaders() });
  }

  deleteReaction(messageId: number, userId: number) {
    return this.http.delete(`${this.apiUrl}/delete/${userId}/${messageId}`, { headers: UserService.getHeaders() });
  }


}
