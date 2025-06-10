import {Injectable} from '@angular/core';
import { DiscordUser } from '../model/discordUser';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  static user : DiscordUser;

  static isConected(): boolean {
    return UserService.user !== undefined && UserService.user.id !== undefined;
  }

  static setUser(user: DiscordUser) {
    UserService.user = user;
  }

  static getUserId(): number | undefined {
    return UserService.user ? UserService.user.id : undefined;
  }
}
