import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  returnUrl: string = '/';  
  passwordFieldType: string = 'password';
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        const token = response.token;        
        const username = response.username;  
        this.authService.storeUserCredentials(token, username);  
        this.router.navigate(['/']);  
      },
      (error) => {
        this.errorMessage = 'Invalid credentials';
        console.error('Login failed:', error);
      }
    );
  }
}
