import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DiscordUser} from '../../../model/discordUser';
import {UserService} from '../../../service/userService';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-comp.component.html',
  standalone: true,
  styleUrl: '../connexion-comp.component.css'
})
export class RegisterComp {
  @Output() toggle = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<{ pseudo: string; password: string; token: string }>();


  confirmPassword: string;
  user: DiscordUser;
  errorMessage: string;

  equalsPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    if (this.user && control.value !== this.userForm.get('password')?.value) {
      return { 'passwordMismatch': true }; // Return an error if passwords do not match
    }
    return null; // Return null if passwords match
  }

  userForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, this.equalsPasswordValidator.bind(this)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),

  });


  constructor(
    private userService: UserService
  ) {
    this.user = new DiscordUser(undefined, '', '', '');
    this.confirmPassword = '';
    this.errorMessage = '';
  }
  toggleRegister() {
    this.toggle.emit(); // Emit an event to notify the parent component
  }

  onRegister() {
    if (this.userForm.valid) {
      // Extract values from the form
      this.user.login = this.userForm.get('username')?.value;
      this.user.email = this.userForm.get('email')?.value;
      this.user.pwd = this.userForm.get('password')?.value;

      this.userService.register(this.user).subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);
          // Emit the registration success event with user details

          if (this.user.login == undefined || this.user.pwd == undefined) {
            this.errorMessage = 'Username and password cannot be empty.';
            return;
          }

          this.userService.login(this.user.login, this.user.pwd).subscribe({
            next: (loginResponse: any) => {
              if (this.user.login == undefined || this.user.pwd == undefined) {
                this.errorMessage = 'Username and password cannot be empty.';
                return;
              }
              console.log('Login successful:', loginResponse);
              this.registerSuccess.emit({ pseudo: this.user.login, password: this.user.pwd, token: loginResponse.token });
            },
            error: (loginError: any) => {
              console.error('Login after registration failed:', loginError);
              this.errorMessage = 'Login after registration failed. Please try again.';
            }
          })
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });

      // Reset the form after successful registration
      this.userForm.reset();
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }

  }
}
