import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DecimalPipe, UpperCasePipe} from '@angular/common';
import {MessageService} from '../../service/messageService';

@Component({
  selector: 'app-message',
  imports: [
    UpperCasePipe,
    DecimalPipe
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

  }

  deleteMess() {
    this.messageDeleted.emit(this.message.id);
  }
}
