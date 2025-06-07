import {Component, Input, OnInit} from '@angular/core';
import {ChannelService} from '../../service/channelService';
import {Message} from '../message/message';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.html',
  imports: [
    Message
  ],
  styleUrls: ['./channel.css']
})

export class Channel implements OnInit {
  @Input({required:false}) id : any;
  channel: any;
  error: string | null = null;

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    if (!this.id) {
      this.id = 1; // Default channel ID if not provided
    }
    this.channelService.getChannel(this.id).subscribe({
      next: (data) => this.channel = data,
      error: (err) => this.error = 'Erreur lors du chargement du channel'
    });
  }

  ngOnChanges(): void {
    if (this.id) {
      this.channelService.getChannel(this.id).subscribe({
        next: (data) => this.channel = data,
        error: (err) => this.error = 'Erreur lors du chargement du channel'
      });
    }
  }
}
