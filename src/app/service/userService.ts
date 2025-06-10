import {Injectable} from '@angular/core';
import { DiscordUser } from '../model/discordUser';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private apiUrl = 'http://localhost:8080/WS_PROJECT_DISCORD_war_exploded/user';
  static user : DiscordUser;
  static httpHeaders : HttpHeaders;

  constructor(private http: HttpClient) {
  }

  static setHeaders(token: string) {
    UserService.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic' + btoa( token) // Replace with actual credentials
    });
  }

  static getHeaders(): HttpHeaders {
    return UserService.httpHeaders;
  }

  static isConected(): boolean {
    return UserService.user !== undefined && UserService.user.id !== undefined;
  }

  static setUser(user: DiscordUser) {
    UserService.user = user;
  }

  static getUserId(): number | undefined {
    return UserService.user ? UserService.user.id : undefined;
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: UserService.getHeaders()});
  }
}
