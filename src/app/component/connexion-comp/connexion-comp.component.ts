import {Component, EventEmitter, Output} from '@angular/core';
import {LoginComp} from './login-comp/login-comp.component';
import {RegisterComp} from './register-comp/register-comp.component';
import {UserService} from '../../service/userService';

@Component({
  selector: 'app-connexion',
  imports: [
    LoginComp,
    RegisterComp
  ],
  templateUrl: './connexion-comp.component.html',
  styleUrl: './connexion-comp.component.css'
})
export class ConnexionComp {
  @Output() connexionSucess = new EventEmitter()
  isLoggingIn : boolean = true;

  constructor(private userService : UserService) {
  }

  loginSuccess($event: { pseudo: string; password: string; token: string }) {

    this.userService.setHeaders($event.token);
    this.userService.getUserWithPseudo($event.pseudo).subscribe({
      next: (user: any) => {
        this.userService.setUser(user);
        this.connexionSucess.emit(true);
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
        // Handle error appropriately, e.g., show a message to the user
      }
    });
  }
}
