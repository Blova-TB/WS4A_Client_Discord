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
  private static respondMessageId: number | undefined;


  constructor(private http: HttpClient) {
  }

  postMessage(receiverId: number|undefined, chanenelId: number|undefined, message: string): Observable<any> {
    if (!message) {
      throw new Error('Message content is required');
    }

    if(receiverId !== undefined && chanenelId !== undefined) {
      throw new Error('Either receiverId or channelId must be provided, not both');
    }

    if (receiverId === undefined && chanenelId === undefined) {
      throw new Error('Either receiverId or channelId must be provided');
    }

    var newMessage = new Message( UserService.getUserId(), undefined, message, chanenelId, receiverId, MessageService.respondMessageId);
    this.resetRespondMessageId();
    return this.http.post(`${this.apiUrl}/`, newMessage, { headers: UserService.getHeaders() });
  }

  deleteMessage($event: number) {
    if(this.respondMessageId === $event) {
      this.resetRespondMessageId();
    }
    return this.http.delete(`${this.apiUrl}/${$event}`, { headers: UserService.getHeaders() });
  }

  editMessage($event: Message): Observable<any> {
    if (!$event.content) {
      throw new Error('Message content is required');
    }
    return this.http.patch(`${this.apiUrl}/`, $event, { headers: UserService.getHeaders() });
  }

  setRespondMessageId(id: number) {
    MessageService.respondMessageId = id;
  }

  resetRespondMessageId() {
    MessageService.respondMessageId = undefined;
  }

  get respondMessageId(): number | undefined {
    return MessageService.respondMessageId;
  }

  getMessagge($event: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${$event}`, { headers: UserService.getHeaders() });
  }
}
