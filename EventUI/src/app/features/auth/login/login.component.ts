import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit() {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        // set auth cookie
        this.cookieService.set('Authorization',`Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict');  //true is secure and will be sent only over https connections
        
        // set user in local storage
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        // redirect to home page
        this.router.navigateByUrl('/');
      }
      
    });
  }

  


}
