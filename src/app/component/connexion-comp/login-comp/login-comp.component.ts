import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../../service/userService';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
  ],
  templateUrl: './login-comp.component.html',
  standalone: true,
  styleUrl: '../connexion-comp.component.css'
})
export class LoginComp {
  pseudo = '';
  password = '';
  errorMessage = '';

  @Output() loginSuccess = new EventEmitter<{ pseudo: string; password: string; token :string }>();
  @Output() registerToggle = new EventEmitter<void>();

  constructor(private userService : UserService) {
  }
  onLogin() {
    if (this.pseudo.trim() && this.password) {
      this.userService.login(this.pseudo, this.password).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          this.loginSuccess.emit({ pseudo: this.pseudo, password: this.password, token: response.token});
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      });
    }
  }

  toggleRegister() {
    this.registerToggle.emit(); // Emit an event to toggle to the registration component
    this.errorMessage = ''; // Clear any previous error messages

  }
}
