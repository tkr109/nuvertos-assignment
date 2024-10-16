import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      (response: any) => {
        const token = response.token;        
        const username = response.username;  
        this.authService.storeUserCredentials(token, username);  
        this.router.navigate(['/']);  
      },
      (error) => {
        this.errorMessage = 'Registration failed';
        console.error('Registration failed:', error);
      }
    );
  }
}
