import { Component } from '@angular/core';
import { ChannelComp } from './component/channelComp/channel-comp.component';
import { MenuComp } from './component/menuComp/menu-comp.component';
import { UserService } from './service/userService';
import {DiscordUser} from './model/discordUser';


@Component({
  selector: 'app-root',
  imports: [ChannelComp, MenuComp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'WS4A-CLIENT-DISCORD';
  channelSelected: number | undefined;
  privateDiscutionSelected : number | undefined;

  constructor() {
    this.channelSelected = undefined;
    this.privateDiscutionSelected = undefined;
    UserService.setUser(new DiscordUser(1, 'TestUser', 'test@gmail.com',undefined)); //TODO
  }

  isUserConnected(): boolean {
    return UserService.isConected();
  }

  onChannelSelected($event: any) {
    console.log('Channel selected:', $event); //TODO: log a enlever
    this.channelSelected = $event;
  }

  onPrivateDiscutionSelected($event: any) {
    console.log('Private discussion selected:', $event); //TODO: log a enlever
    this.privateDiscutionSelected = $event;
  }
}
