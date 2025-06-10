import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-message-input',
  imports: [
    FormsModule
  ],
  templateUrl: './message-input-comp.component.html',
  styleUrl: './message-input-comp.component.css',
  standalone: true
})
export class MessageInputComp {
  message: string = '';
  @Output() messageSent = new EventEmitter<string>();

  sendMessage() {
    const trimmed = this.message.trim();
    if (trimmed) {
      this.messageSent.emit(trimmed);
      this.message = '';
    }
  }
}
