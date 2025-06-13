import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-reaction-popup',
  imports: [],
  templateUrl: './reaction-popup.html',
  standalone: true,
  styleUrl: './reaction-popup.css'
})
export class ReactionPopup {
  @Output() emojiSelected = new EventEmitter<string>();


  // List of head emojis to display in the popup
  characterEmojis: string[] = [
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆',
    '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗'
  ];
  //list of other emojis
  animalEmojis: string[] = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🦁', '🐯', '🐨', '🐸', '🐵', '🦄', '🦋', '🐝'
  ];
  foodEmojis: string[] = [
    '🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🥑', '🍕',
    '🍔', '🍟', '🌭', '🍿', '🥗', '🍰', '🍩', '🍪'
  ];
  //other emojis
  otherEmojis: string[] = [
    '🎈', '🎁', '🎊', '🎶', '🎵', '📚', '🖼️', '🧩',
    '🚀', '🌟', '💡', '🔔', '⚽', '🏀', '🏈', '🎮'
  ];
  //in only one tab
  allEmojis: (string | string[])[][] = [
    ["Characters", this.characterEmojis],
    ["Animals", this.animalEmojis],
    ["Food", this.foodEmojis],
    ["Other", this.otherEmojis],
    ["Secret", ['🐟']]
  ];

  onEmojiSelect(emoji: string) {
    if (emoji == '🐟') {
        let audio = new Audio();
        audio.src = "pwasson.mp3";
        audio.load();
        audio.volume = 0.16;
        audio.play();
         // Set volume to 50%
      //makes the audio stop after 15 seconds
      setTimeout(() => {
        audio.pause();
      }, 16500);
    }
    this.emojiSelected.emit(emoji); // Emit the selected emoji
  }

  closePopup() {
    this.emojiSelected.emit(undefined); // Emit an empty string to indicate closure
  }

}
