import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pEvent } from '../models/pEvent.model';
import { PeventService } from '../services/pevent.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  Events$?: Observable<pEvent[]>;

  constructor(private PeventService: PeventService) {}

  ngOnInit(): void {
    this.Events$ = this.PeventService.getAllEvents();
      
  }

}
