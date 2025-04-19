import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pEvent } from '../../../pevent/models/pEvent.model';
import { PeventService } from '../../../pevent/services/pevent.service';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-details',
  imports: [MarkdownModule, CommonModule, RouterModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit{

url : string | null = null;
event$? : Observable<pEvent>

constructor(private route: ActivatedRoute, private eventService : PeventService) { }

ngOnInit() : void {
  this.route.paramMap.subscribe( {
    next: (params) => {
      this.url = params.get('url');
      if (this.url) {
        this.event$ = this.eventService.getEventByUrlHandle(this.url);
      }
    }
  })
}



}
