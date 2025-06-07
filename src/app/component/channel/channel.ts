import {Component, Input, OnInit} from '@angular/core';
import {ChannelService} from '../../service/channelService/channel';
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
  @Input({required:true}) id: any; // Default ID for demonstration purposes
  channel: any;
  error: string | null = null;

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.channelService.getChannel(this.id).subscribe({
      next: (data) => this.channel = data,
      error: (err) => this.error = 'Erreur lors du chargement du channel'
    });
  }
}
