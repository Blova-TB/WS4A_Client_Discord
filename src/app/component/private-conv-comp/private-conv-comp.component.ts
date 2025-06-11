import {Component, Input, OnInit} from '@angular/core';
import {MessageComp} from '../message-comp/message-comp.component';
import {MessageInputComp} from '../message-input-comp/message-input-comp.component';
import {MessageService} from '../../service/messageService';
import {ConversationService} from '../../service/conversationService';

@Component({
  selector: 'app-private-conv',
  imports: [
    MessageComp,
    MessageInputComp
  ],
  templateUrl: './private-conv-comp.component.html',
  styleUrl: './private-conv-comp.component.css'
})
export class PrivateConvComp implements OnInit{
  @Input({required: true}) id: number = -1;
  conv: any;
  error: string | null = null;

  constructor(private conversationService: ConversationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.id != undefined) {
      this.conversationService.getConv(this.id).subscribe({
        next: (data) => this.conv = data,
        error: (err) => this.error = 'Erreur lors du chargement du channel'
      });
    }
  }

  ngOnChanges(): void {
    if (this.id) {
      this.conversationService.getConv(this.id).subscribe({
        next: (data) => this.conv = data,
        error: (err) => this.error = 'Erreur lors du chargement du channel'
      });
    }
  }

  onMessageSent(message: string): void {
    if (message != undefined) {
      this.messageService.postMessage(this.id, undefined , message).subscribe(
        {
          next: () => {
            this.conversationService.getConv(this.id).subscribe({
              next: (data) => this.conv = data,
              error: (err) => this.error = 'Erreur lors de l\'envoi du message'
            });
          },
          error: (err) => this.error = 'Erreur lors de l\'envoi du message'
        }
      )
    }
  }

  onDeleteMess($event : number) {
    this.messageService.deleteMessage($event).subscribe({
      next: () => {
        this.conversationService.getConv(this.id).subscribe({
          next: (data) => this.conv = data,
          error: (err) => this.error = 'Erreur lors de la suppression du message'
        });
      },
      error: (err: string) => this.error = 'Erreur lors de la suppression du message' + err
    });
  }
}
