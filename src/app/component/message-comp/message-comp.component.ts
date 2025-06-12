import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DecimalPipe, NgClass, NgIf, UpperCasePipe} from '@angular/common';
import {MessageService} from '../../service/messageService';
import {UserService} from '../../service/userService';
import {ReactionService} from '../../service/reaction.service';
import {ReactionPopup} from '../reaction-popup/reaction-popup';
import {MessageInputComp} from '../message-input-comp/message-input-comp.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-message',
  imports: [
    UpperCasePipe,
    DecimalPipe,
    NgClass,
    NgIf,
    ReactionPopup,
    MessageInputComp
  ],
  templateUrl: './message-comp.component.html',
  styleUrl: './message-comp.component.css',
  standalone: true
})
export class MessageComp {
  @Input({ required: true }) isAdmin: boolean = false;
  @Input ({ required: true }) message: any;
  @Output() messageDeleted = new EventEmitter<number>();

  emojiPopupVisible: boolean = false;
  editMode: boolean = false;
  newMessageContent: string = '';
  constructor(private messageService : MessageService,
              private reactionService : ReactionService
              ) {}

  ngOnInit(): void {}


  onFocusOut() {
    this.emojiPopupVisible = false; // Hide the emoji popup when focus is lost
  }


  updateSelf() {
    const userId = UserService.getUserId();
    if (!userId) {
      console.error('User is not logged in');
      return;
    }
    this.messageService.getMessagge(this.message.id).subscribe({
      next: (response: any) => {
        this.message = response;
        console.log('Message updated successfully:', response);
      },
      error: (error: any) => {
        console.error('Error updating message:', error);
        // Handle error appropriately, e.g., show a message to the user
      }
    });
  }

  addNewEmoji(msg_id: number, emoji: string) {
    this.emojiPopupVisible = false; // Hide the popup if no emoji is selected
    if (!emoji) {
      return;
    }
    const userId = UserService.getUserId();
    if (!userId) {
      console.error('User is not logged in');
      return;
    }

    let obs: Observable<Object>;
    //already has reaction
    const existingReaction =
this.message.reactions.find((reaction: any) => reaction.userId === userId);
    if (existingReaction) {
      // If the reaction already exists, remove it
      obs = this.reactionService.updateReaction(msg_id, userId, emoji);
    } else {
      // If the reaction does not exist, add it
      obs = this.reactionService.addReaction(msg_id, userId, emoji);
    }

    obs.subscribe({
      next: () => {
        this.updateSelf()
        // Optionally, you can update the UI or handle the response
      },
      error: (error: any) => {
        console.error('Error adding reaction:', error);
        // Handle error appropriately, e.g., show a message to the user
      }
    });
  }

  setRespondMess() {
    this.messageService.setRespondMessageId(this.message.id);
  }

  deleteMess() {
    this.messageDeleted.emit(this.message.id);
  }
  onDeleteReaction(msg_id: number, ru_id : number) {
    if (ru_id == UserService.getUserId()) {
      this.reactionService.deleteReaction(msg_id, ru_id).subscribe({
        next: () => {
          this.updateSelf();
          // Optionally, you can update the UI or handle the response
        },
        error: (error: any) => {
          console.error('Error removing reaction:', error);
          // Handle error appropriately, e.g., show a message to the user
        }
      });
    }
  }

  getUserId() {
    return UserService.getUserId();
  }

  isRespondSelected(message: any) {
    return this.messageService.respondMessageId === message.id;
  }

  // messageText(): string {
  //   return (marked.parseInline(this.message.content)) as string;
  // }

  editMessage(content: string) {
    this.toggleEditMode(); // Toggle edit mode off after editing
    if (!content.trim()) {
      console.error('Message content is required for editing');
      return;
    }
    this.message.content = content;
    this.messageService.editMessage(this.message).subscribe({
      next: () => {
        this.updateSelf();
      },
      error: (error: any) => {
        console.error('Error editing message:', error);
        // Handle error appropriately, e.g., show a message to the user
      }
    });
  }

  toggleEditMode() {
    if (!this.editMode) {
      this.newMessageContent = this.message.content; // Initialize with current message content
    }
    this.editMode = !this.editMode;
  }
}
