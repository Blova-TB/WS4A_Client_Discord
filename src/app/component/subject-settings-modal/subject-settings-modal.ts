import { Component, Input, Output, EventEmitter } from '@angular/core';
import {SubjectService} from '../../service/subjectService';

@Component({
  selector: 'app-subject-settings-modal',
  imports: [],
  templateUrl: './subject-settings-modal.html',
  styleUrl: './subject-settings-modal.css'
})
export class SubjectSettingsModal {
  @Input() subject: any;
  @Input() users: any[] = [];
  @Output() close = new EventEmitter<void>();

  constructor(private subjectService: SubjectService) {}

  toggleUser(user: any) {
    const idx = this.subject.users.findIndex((u: any) => u.idUser === user.id);
    if (idx > -1) {
      if(this.subject.users[idx].isAdmin) {
        return;
      }
      this.subject.users.splice(idx, 1);
    } else {
      this.subject.users.push(
        { idUser: user.id, idSubject: this.subject.id, isAdmin: false }
      );
    }
    for(let i = 0; i < this.subject.users.length; i++) {
      this.subject.users[i].idSubject = this.subject.id;
    }
    console.log('Updated users:', this.subject.users);
    this.subjectService.updateSubject(this.subject).subscribe();
  }

  togglePublic() {
    for(let i = 0; i < this.subject.users.length; i++) {
      this.subject.users[i].idSubject = this.subject.id;
    }
    this.subject.isPublic = !this.subject.isPublic;
    console.log('Updated subject visibility:', this.subject.isPublic);
    this.subjectService.updateSubject(this.subject).subscribe();
  }

  onExit() {
    this.close.emit();
  }

  isUserInSubject(user: any) {
    return this.subject.users.some((u: any) => u.idUser === user.id);
  }
}
