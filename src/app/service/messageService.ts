import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {UserService} from './userService';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/WS_PROJECT_DISCORD_war_exploded/message';

  constructor(private http: HttpClient) {
  }

  postMessage(receiverId: number|undefined, chanenelId: number|undefined, message: string, respondToId : number | undefined): Observable<any> {
    if (!message) {
      throw new Error('Message content is required');
    }

    if(receiverId !== undefined && chanenelId !== undefined) {
      throw new Error('Either receiverId or channelId must be provided, not both');
    }

    if (receiverId === undefined && chanenelId === undefined) {
      throw new Error('Either receiverId or channelId must be provided');
    }

    var newMessage = new Message( UserService.getUserId(), undefined, message, chanenelId, receiverId, respondToId);

    return this.http.post(`${this.apiUrl}/`, newMessage, { headers: UserService.getHeaders() });
  }

  deleteMessage($event: number) {
    return this.http.delete(`${this.apiUrl}/${$event}`, { headers: UserService.getHeaders() });
  }
}
