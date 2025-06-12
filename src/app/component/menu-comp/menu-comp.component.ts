import {Component, Output, EventEmitter} from '@angular/core';
import {SubjectService} from '../../service/subjectService';
import {UserService} from '../../service/userService';
import {MessageService} from '../../service/messageService';
import {SubjectSettingsModal} from '../subject-settings-modal/subject-settings-modal';

import {
  ValidationWithTextInputModal
} from '../validation-with-text-input-modal/validation-with-text-input-modal.component';

@Component({
  selector: 'app-menu',
  imports: [
    SubjectSettingsModal,
    ValidationWithTextInputModal
  ],
  templateUrl: './menu-comp.component.html',
  standalone: true,
  styleUrl: './menu-comp.component.css'
})
export class MenuComp {
  showSubjectModal = false;
  subjectToEdit: any;
  subjects: any;
  users: any;
  channelSelectedId: number | undefined;
  userSelectedId: number | undefined;
  @Output() channelSelected = new EventEmitter<{channel:any;isAdmin:boolean}>();
  @Output() userSelected = new EventEmitter<any>();
  protected showCreateSubjectModal: boolean=false;

  constructor(private subjectService: SubjectService,
              private userService: UserService,
              private messageService: MessageService) {
  }

  async ngOnInit(): Promise<void> {
    this.subjectService.getAllSubject().subscribe({
      next: (data) => this.subjects = data,
      error: (err) => console.error('Erreur lors du chargement des sujets', err)
    });
    this.userService.getAllUser().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur lors du chargement des utilisateurs', err)
    });
  }

  onChannelSelected(channel: any, subject:any): void {
    this.channelSelectedId = parseInt(channel);
    this.channelSelected.emit({channel:channel,isAdmin:this.userIsAdminForSubject(subject)});
    this.messageService.resetRespondMessageId();
    this.userSelectedId = undefined;
  }

  isSelectedChannel(channel: any): boolean {
    if (this.channelSelectedId === undefined) {
      return false;
    }
    return this.channelSelectedId === parseInt(channel);
  }

  onUserSelected(user: any): void {
    this.userSelectedId = parseInt(user);
    this.channelSelectedId = undefined;
    this.messageService.resetRespondMessageId();
    this.userSelected.emit(user);
  }

  isSelectedUser(user: any): boolean {
    if (this.userSelectedId === undefined) {
      return false;
    }
    return this.userSelectedId === parseInt(user);
  }

  onLogout() {
    this.userService.logout();
  }

  userAsAccessToSubject(subject: any): boolean {
    if (subject.isPublic){
      return true;
    }
    return subject.users && subject.users.some((user: any) => user.idUser === UserService.getUserId());
  }

  onSubjectSettings(subject: any) {
    this.subjectToEdit = subject; // clone pour édition
    this.showSubjectModal = true;
  }

  userIsAdminForSubject(subject: any) {
    return subject.users.some((user: any) => user.idUser === UserService.getUserId() && user.isAdmin);
  }

  onCloseModal() {
    this.showSubjectModal = false;
    this.ngOnInit();
  }

  createNewSubject(event: string) {
    console.log('Creating new subject with name:', event);
    const subjectName = event.trim();
    if (!subjectName) {
      console.error('Le nom du sujet ne peut pas être vide');
      return;
    }
    const subject =  {
      "name": subjectName,
      "isPublic": false,
      "users": [
        {
          "idUser": UserService.getUserId(),
          "isAdmin": true
        }
      ],
      "channels" : []
    }
    this.showCreateSubjectModal = false;
    this.subjectService.createSubject(subject).subscribe({
      next: (data) => {
        this.subjects.push(data);
      },
      error: (err) => console.error('Erreur lors de la création du sujet', err)
    });
  }

  onNewSubject() {
    this.showCreateSubjectModal = true;
  }
}
