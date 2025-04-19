import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/login-request copy';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: {
    email: string;
    password: string;
    confirmPassword: string;
  } = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  errors: string[] = [];
  isSubmitting = false;
  registrationSuccessful = false;

  constructor(private authService: AuthService, private router: Router) {}

  onFormSubmit(): void {
    // Reset errors
    this.errors = [];
    this.isSubmitting = true;
    
    // Validate passwords match
    if (this.model.password !== this.model.confirmPassword) {
      this.errors.push('Passwords do not match');
      this.isSubmitting = false;
      return;
    }

    const registerRequest: RegisterRequest = {
      email: this.model.email,
      password: this.model.password
    };

    this.authService.register(registerRequest).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.registrationSuccessful = true;
        
        // Redirect to login page after showing success message
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 2000); // Redirect after 2 seconds
      },
      error: (error) => {
        this.isSubmitting = false;
        
        if (error.error && error.error.errors) {
          // Extract validation errors from response
          const errorObj = error.error.errors;
          
          for (const key in errorObj) {
            if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
              if (Array.isArray(errorObj[key])) {
                errorObj[key].forEach((err: string) => {
                  this.errors.push(err);
                });
              } else {
                this.errors.push(errorObj[key]);
              }
            }
          }
        } else if (error.error && typeof error.error === 'string') {
          this.errors.push(error.error);
        } else {
          this.errors.push('Registration failed. Please try again.');
        }
      }
    });
  }
}