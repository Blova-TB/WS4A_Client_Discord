import { Component } from '@angular/core';
import { ChannelComp } from './component/channel-comp/channel-comp.component';
import { MenuComp } from './component/menu-comp/menu-comp.component';
import { UserService } from './service/userService';
import {DiscordUser} from './model/discordUser';
import {PrivateConvComp} from './component/private-conv-comp/private-conv-comp.component';
import {ConnexionComp} from './component/connexion-comp/connexion-comp.component';


@Component({
  selector: 'app-root',
  imports: [ChannelComp, MenuComp, PrivateConvComp, ConnexionComp],
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
  }

  isUserConnected(): boolean {
    return UserService.isConected();
  }

  onChannelSelected($event: any) {
    console.log('Channel selected:', $event); //TODO: log a enlever
    this.privateDiscutionSelected = undefined;
    this.channelSelected = $event;
  }

  onPrivateDiscutionSelected($event: any) {
    console.log('Private discussion selected:', $event); //TODO: log a enlever
    this.channelSelected = undefined;
    this.privateDiscutionSelected = $event;
  }
}
