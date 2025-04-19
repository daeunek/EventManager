import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MyRegistrationResponse } from '../models/MyRegistrationResponse';
import { EventRegisterService } from '../services/event-register.service';

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

}
