import {Component, Output, EventEmitter} from '@angular/core';
import {SubjectService} from '../../service/subjectService';
import {UserService} from '../../service/userService';
import {MessageService} from '../../service/messageService';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu-comp.component.html',
  styleUrl: './menu-comp.component.css'
})
export class MenuComp {
  subjects: any;
  users: any;
  channelSelectedId: number | undefined;
  userSelectedId: number | undefined;
  @Output() channelSelected = new EventEmitter<{channel:any;isAdmin:boolean}>();
  @Output() userSelected = new EventEmitter<any>();

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
    //todo
  }

  userIsAdminForSubject(subject: any) {
    return subject.users.some((user: any) => user.idUser === UserService.getUserId() && user.isAdmin);
  }
}
