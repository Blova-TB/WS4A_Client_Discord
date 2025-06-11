import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DecimalPipe, NgClass, UpperCasePipe} from '@angular/common';
import {MessageService} from '../../service/messageService';

@Component({
  selector: 'app-message',
  imports: [
    UpperCasePipe,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './message-comp.component.html',
  styleUrl: './message-comp.component.css',
  standalone: true
})
export class MessageComp {
  @Input({ required: true }) isAdmin: boolean = false;
  @Input ({ required: true }) message: any;
  @Output() messageDeleted = new EventEmitter<number>();

  constructor(private messageService : MessageService) {}

  ngOnInit(): void {}

  addNewEmoji() {

  }

  setRespondMess() {
    this.messageService.setRespondMessageId(this.message.id);
  }

  deleteMess() {
    this.messageDeleted.emit(this.message.id);
  }

  isRespondSelected(message: any) {
    return this.messageService.respondMessageId === message.id;
  }
}
