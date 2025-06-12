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

  static getHeaders(): HttpHeaders {
    return this.httpHeaders;
  }

  static isConected(): boolean {
    return this.user !== undefined && this.user.id !== undefined;
  }

  static getUserId(): number | undefined {
    return this.user ? this.user.id : undefined;
  }

  setUser(id: number, login: string, email: string, password: string) {
    UserService.user = new DiscordUser(id, login, email, password);
  }

  setHeaders(token: string) {
    UserService.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    });
  }

  getUserWithPseudo(pseudo : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${pseudo}`, { headers: UserService.getHeaders() });
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: UserService.getHeaders()});
  }

  login(pseudo: string, password: string): Observable<any> {
    const token = btoa(`${pseudo}:${password}`);
    const headers = new HttpHeaders({
      'authorization': `Basic ${token}`
    });
    return this.http.post(`http://localhost:8080/WS_PROJECT_DISCORD_war_exploded/AuthServer/connect`, null, { headers });
  }

  register(user: DiscordUser): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user, { headers: UserService.getHeaders() });
  }

  logout() {
    UserService.user = new DiscordUser(undefined, '', '', '');
  }
}
