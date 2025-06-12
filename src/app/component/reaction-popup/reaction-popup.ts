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
    ["Other", this.otherEmojis]
  ];

  onEmojiSelect(emoji: string) {
    this.emojiSelected.emit(emoji); // Emit the selected emoji
  }

  closePopup() {
    // Logic to close the popup can be added here
    console.log('Popup closed');
    this.emojiSelected.emit(undefined); // Emit an empty string to indicate closure
  }

}
