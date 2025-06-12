import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DecimalPipe, NgClass, UpperCasePipe} from '@angular/common';
import {MessageService} from '../../service/messageService';
import {UserService} from '../../service/userService';
import {ReactionService} from '../../service/reaction.service';

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

  constructor(private messageService : MessageService,
              private reactionService : ReactionService
              ) {}

  ngOnInit(): void {}


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
    const userId = UserService.getUserId();
    if (!userId) {
      console.error('User is not logged in');
      return;
    }
    this.reactionService.addReaction(msg_id, userId, emoji).subscribe({
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
}
