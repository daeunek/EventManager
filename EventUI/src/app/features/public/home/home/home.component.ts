import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeventService } from '../../../pevent/services/pevent.service';
import { pEvent } from '../../../pevent/models/pEvent.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  events$? : Observable<pEvent[]>;

  constructor(private eventService: PeventService) {}

  ngOnInit() : void {
    this.events$ = this.eventService.getAllEvents();
  }



}
