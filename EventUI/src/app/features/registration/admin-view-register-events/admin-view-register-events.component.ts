import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventRegisterService } from '../services/event-register.service';
import { RegisterEventResponse } from '../models/registerEventResponse';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PeventService } from '../../pevent/services/pevent.service';

@Component({
  selector: 'app-admin-view-register-events',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './admin-view-register-events.component.html',
  styleUrl: './admin-view-register-events.component.css'
})
export class AdminViewRegisterEventsComponent implements OnInit{

  registrations$? : Observable<RegisterEventResponse[]>;
  event$? : Observable<any>;
  eventId : string = '';

  constructor(private registrationService : EventRegisterService, private route: ActivatedRoute, private eventService: PeventService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const eventId = params.get('id');
        if (eventId) {
          this.eventId = eventId;
          this.registrations$ = this.registrationService.getAdminViewEvents(this.eventId);
          this.event$ = this.eventService.getEventById(this.eventId);
        }
      }
    });
  }

  
}
