import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from './userService';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8080/WS_PROJECT_DISCORD_war_exploded/subject';

  constructor(private http: HttpClient) {
  }

  getAllSubject(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: UserService.getHeaders() });
  }
}
