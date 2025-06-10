import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from './userService';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private apiUrl = 'http://localhost:8080/WS_PROJECT_DISCORD_war_exploded/channel';

  constructor(private http: HttpClient) {
  }

  getChannel(id: number): Observable<any> {
    if (!id) {
      throw new Error('Channel ID is required');
    }
    return this.http.get(`${this.apiUrl}/${id}`, { headers: UserService.getHeaders()});
  }
}
