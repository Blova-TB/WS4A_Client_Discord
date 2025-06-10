import {Component, Input, OnInit} from '@angular/core';
import {ChannelService} from '../../service/channelService';
import {MessageService} from '../../service/messageService';
import {MessageComp} from '../messageComp/message-comp.component';
import {MessageInputComp} from '../messageInputComp/message-input-comp.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel-comp.component.html',
  imports: [
    MessageComp,
    MessageInputComp
  ],
  styleUrls: ['./channel-comp.component.css']
})

export class ChannelComp implements OnInit {
  @Input({required: true}) id: number = -1;
  channel: any;
  error: string | null = null;

  constructor(private channelService: ChannelService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.id != undefined) {
      this.channelService.getChannel(this.id).subscribe({
        next: (data) => this.channel = data,
        error: (err) => this.error = 'Erreur lors du chargement du channel'
      });
    }
  }

  ngOnChanges(): void {
    if (this.id) {
      this.channelService.getChannel(this.id).subscribe({
        next: (data) => this.channel = data,
        error: (err) => this.error = 'Erreur lors du chargement du channel'
      });
    }
  }

  onMessageSent(message: string): void {
    if (message != undefined) {
      this.messageService.postMessage(undefined, this.id, message, undefined).subscribe(
        {
          next: () => {
            this.channelService.getChannel(this.id).subscribe({
              next: (data) => this.channel = data,
              error: (err) => this.error = 'Erreur lors de l\'envoi du message'
            });
          },
          error: (err) => this.error = 'Erreur lors de l\'envoi du message'
        }
      )
    }
  }
}
