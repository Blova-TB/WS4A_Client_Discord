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

  updateSubject(updatedSubject: any): Observable<any> {
    console.log('FINALE Updating subject:', updatedSubject);
    return this.http.put(`${this.apiUrl}/`,updatedSubject, { headers: UserService.getHeaders() });
  }

  deleteSubject(subjectId: number): Observable<any> {
    console.log('Deleting subject with ID:', subjectId);
    return this.http.delete(`${this.apiUrl}/${subjectId}`, { headers: UserService.getHeaders() });
  }

  createSubject(newSubject: any): Observable<any> {
    console.log('Creating subject:', newSubject);
    return this.http.post(`${this.apiUrl}/`, newSubject, { headers: UserService.getHeaders() });
  }
}
