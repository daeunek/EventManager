import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pEvent } from '../models/pEvent.model';
import { environment } from '../../../../environments/environment.development';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddEventModel } from '../models/add-event.model';
import { UpdateEventModel } from '../models/update-event.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class PeventService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllEvents() : Observable<pEvent[]> {
    return this.http.get<pEvent[]>(`${environment.apiBaseUrl}/api/events`);
  }

  createEvent(data : AddEventModel) : Observable<pEvent> {
    return this.http.post<pEvent>(`${environment.apiBaseUrl}/api/events`, data, {
      headers : {
        'Authorization': this.cookieService.get('Authorization')   // set in log in method
      }
    });
  }

  getEventById(id: string) : Observable<pEvent> {
    return this.http.get<pEvent>(`${environment.apiBaseUrl}/api/events/${id}`);
  }

  updateEvent(id : string, data : UpdateEventModel) : Observable<pEvent> {
    return this.http.put<pEvent>(`${environment.apiBaseUrl}/api/events/${id}`, data, {
      headers : {
        'Authorization': this.cookieService.get('Authorization')   // set in log in method
      }
    });
  }

  deleteEvent(id : string) : Observable<pEvent> {
    return this.http.delete<pEvent>(`${environment.apiBaseUrl}/api/events/${id}`, {
      headers : {
        'Authorization': this.cookieService.get('Authorization')   // set in log in method
      }
    });
  }

  getEventByUrlHandle(urlHandle: string) : Observable<pEvent> {
    return this.http.get<pEvent>(`${environment.apiBaseUrl}/api/events/${urlHandle}`);
  }
}
