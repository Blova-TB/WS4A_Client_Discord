import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SubjectService} from '../../service/subjectService';
import {ValidationModal} from '../validation-modal/validation-modal';
import {
  ValidationWithTextInputModal
} from '../validation-with-text-input-modal/validation-with-text-input-modal.component';
import {ChannelService} from '../../service/channelService';

@Component({
  selector: 'app-subject-settings-modal',
  imports: [
    ValidationModal,
    ValidationWithTextInputModal
  ],
  templateUrl: './subject-settings-modal.html',
  styleUrl: './subject-settings-modal.css'
})
export class SubjectSettingsModal {
  @Input() subject: any;
  @Input() users: any[] = [];
  @Output() close = new EventEmitter<void>();
  modalValidationDeletionVisible: boolean = false;
  modalValidationCreationChannelVisible: boolean = false;


  constructor(private subjectService: SubjectService,
              private channelService: ChannelService) {
  }

  toggleUser(user: any) {
    const idx = this.subject.users.findIndex((u: any) => u.idUser === user.id);
    if (idx > -1) {
      if (this.subject.users[idx].isAdmin) {
        return;
      }
      this.subject.users.splice(idx, 1);
    } else {
      this.subject.users.push(
        {idUser: user.id, idSubject: this.subject.id, isAdmin: false}
      );
    }
    for (let i = 0; i < this.subject.users.length; i++) {
      this.subject.users[i].idSubject = this.subject.id;
    }
    console.log('Updated users:', this.subject.users);
    this.subjectService.updateSubject(this.subject).subscribe();
  }

  togglePublic() {
    for (let i = 0; i < this.subject.users.length; i++) {
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

  onNewChannel() {
    this.modalValidationCreationChannelVisible = true;
  }

  onDeleteSubject() {
    this.modalValidationDeletionVisible = true;
  }

  onModalValidationDeletionNo() {
    this.modalValidationDeletionVisible = false;
  }

  onModalValidationDeletionYes() {
    this.modalValidationDeletionVisible = false;
    this.subjectService.deleteSubject(this.subject.id).subscribe(() => {
      this.close.emit();
    });
  }

  onModalValidationCreationChannelNo() {
    this.modalValidationCreationChannelVisible = false;
  }

  onModalValidationCreationChannelYes(name: string) {
    this.modalValidationCreationChannelVisible = false;
    this.channelService.createChannel(this.subject.id, name).subscribe(
      (response) => {
        this.close.emit();
      },
      (error) => {
        console.error('Error creating channel:', error);
      }
    );

  }
}
