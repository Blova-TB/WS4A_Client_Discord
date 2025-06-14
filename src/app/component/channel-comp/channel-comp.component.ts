import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ChannelService} from '../../service/channelService';
import {MessageService} from '../../service/messageService';
import {MessageComp} from '../message-comp/message-comp.component';
import {MessageInputComp} from '../message-input-comp/message-input-comp.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel-comp.component.html',
  imports: [
    MessageComp,
    MessageInputComp
  ],
  styleUrls: ['./channel-comp.component.css'],
  standalone: true
})

export class ChannelComp implements OnInit {
  @Input({required: true}) isAdmin: boolean = false;
  @Input({required: true}) id: number = -1;
  private refreshInterval: any;
  channel: any;
  error: string | null = null;

  constructor(private channelService: ChannelService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadChannel();
    // this.refreshInterval = setInterval(() => {
    //   this.loadChannel();
    // }, 2000);
    //TODO a voir
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  ngOnChanges(): void {
    this.loadChannel();
  }

  private loadChannel(): void {
    if (this.id != undefined) {
      this.channelService.getChannel(this.id).subscribe({
        next: (data) => this.channel = data,
        error: (err) => this.error = 'Erreur lors du chargement du channel'
      });
    }
  }

  onMessageSent(message: string): void {
    if (message != undefined) {
      this.messageService.postMessage(undefined, this.id, message).subscribe(
        {
          next: () => {
            this.loadChannel();
          },
          error: (err) => this.error = 'Erreur lors de l\'envoi du message'
        }
      )
    }
  }

  onDeleteMess($event: number) {
    this.messageService.deleteMessage($event).subscribe({
      next: () => {
        this.loadChannel();
      },
      error: (err) => this.error = 'Erreur lors de la suppression du message'
    });
  }
}
