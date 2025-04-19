import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MyRegistrationResponse } from '../models/MyRegistrationResponse';
import { EventRegisterService } from '../services/event-register.service';
import { RegisterEventResponse } from '../models/registerEventResponse';

@Component({
  selector: 'app-myevents',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './myevents.component.html',
  styleUrl: './myevents.component.css'
})
export class MyeventsComponent implements OnInit {
  registrations$? : Observable<MyRegistrationResponse[]>;

  constructor(private eventRegisterService : EventRegisterService) { }

  ngOnInit(): void {
      this.loadRegistrations();
  }

  loadRegistrations() {
    this.registrations$ = this.eventRegisterService.getMyRegisteredEvents();
  }

  cancelRegistration(registrationId: string): void {
    if (confirm('Are you sure you want to cancel this registration?')) {
      this.eventRegisterService.cancelRegister(registrationId).subscribe({
        next: () => {
          // Reload the registrations to reflect the change
          this.loadRegistrations();
        },
        error: (error) => {
          console.error('Error cancelling registration:', error);
          alert('Failed to cancel registration. Please try again.');
        }
      });
    }
  }

}
