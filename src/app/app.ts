import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Channel} from './component/channel/channel';
import { HttpClientModule } from '@angular/common/http';
import {Menu} from './component/menu/menu';


@Component({
  selector: 'app-root',
  imports: [Channel, HttpClientModule, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  channelSelected: any;

  onChannelSelected($event: any) {
    console.log('Channel selected:', $event);
    this.channelSelected = $event;
  }
  protected title = 'WS4A-CLIENT-DISCORD';
}
