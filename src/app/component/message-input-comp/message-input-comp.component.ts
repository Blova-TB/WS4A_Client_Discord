import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() message: string = '';
  @Output() messageSent = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('MessageInputComp initialized : ', this.message);
  }
  playAudio(){
    let audio = new Audio();
    audio.src = "budim2.wav";
    audio.load();
    audio.play();
  }

  sendMessage() {
    const trimmed = this.message.trim();
    if (trimmed) {
      this.messageSent.emit(trimmed);
      this.message = '';
      this.playAudio();
    }
  }
}
