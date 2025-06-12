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
  playAudio(i: number) {
    let audio = new Audio();
    switch (i) {
      case 0:
        audio.src = "budim2.wav";
        break;
      case 1:
        audio.src = "WYSI.wav";
        break;
      case 2:
        audio.src = "fishAuChocolat.wav";
        break;
    }
    audio.load();
    audio.play();
  }


  sendMessage() {
    const trimmed = this.message.trim();
    if (trimmed) {
      this.messageSent.emit(trimmed);
      this.message = '';
      if(trimmed.includes("727")){
        this.playAudio(1);
      }else if(trimmed.includes("baguette")){
        this.playAudio(2);
      }else{
        this.playAudio(0);
      }
    }
  }
}
