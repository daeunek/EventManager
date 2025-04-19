import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterEventRequest } from '../models/registerEventRequest';
import { EventRegisterService } from '../services/event-register.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-event.component.html',
  styleUrl: './register-event.component.css'
})
export class RegisterEventComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  model: RegisterEventRequest = {
    eventId: '',
    contactName: '',
    contactPhone: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventRegisterService: EventRegisterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.model.eventId = id;
        } else {
          this.errorMessage = 'Event ID not provided';
        }
      }
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.eventRegisterService.registerForEvent(this.model).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'You have successfully registered for this event!';
      },
      error: (error) => {
        this.isLoading = false;
        
        if (error.status === 400) {
          if (error.error === "Admins cannot register for events.") {
            this.errorMessage = "Admins cannot register for events.";
          } else if (error.error && typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else if (error.error && error.error.errors) {
            const errorMessages = [];
            for (const key in error.error.errors) {
              errorMessages.push(error.error.errors[key]);
            }
            this.errorMessage = errorMessages.join(' ');
          } else {
            this.errorMessage = "Failed to register for the event.";
          }
        } else {
          this.errorMessage = "An error occurred while processing your registration.";
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}