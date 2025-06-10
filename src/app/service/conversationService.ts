import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService} from './userService';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl = 'http://localhost:8080/WS_PROJECT_DISCORD_war_exploded/privConv';

  constructor(private http: HttpClient) {
  }

  getConv(id: number): Observable<any> {
    if (!id) {
      throw new Error('User ID is required');
    }
    return this.http.get(`${this.apiUrl}/${UserService.getUserId()}/${id}`, { headers: UserService.getHeaders()});
  }
}
