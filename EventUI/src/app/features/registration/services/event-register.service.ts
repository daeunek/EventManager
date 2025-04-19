import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterEventRequest } from '../models/registerEventRequest';
import { RegisterEventResponse } from '../models/registerEventResponse';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventRegisterService {

  constructor(private http: HttpClient, private cookieService : CookieService) { }

  registerForEvent(request: RegisterEventRequest): Observable<RegisterEventResponse> {
    return this.http.post<RegisterEventResponse>(`${environment.apiBaseUrl}/api/eventregister`, request, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  getMyRegisteredEvents(): Observable<RegisterEventResponse[]> {
    return this.http.get<RegisterEventResponse[]>(`${environment.apiBaseUrl}/api/eventregister`, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  getAdminViewEvents(eventId: string): Observable<RegisterEventResponse[]> {
    return this.http.get<RegisterEventResponse[]>(
      `${environment.apiBaseUrl}/api/eventregister/${eventId}`, 
      {
        headers: {
          'Authorization': this.cookieService.get('Authorization')
        }
      }
    );
  }

  cancelRegister(registrationId: string) : Observable<RegisterEventResponse> {
    return this.http.delete<RegisterEventResponse>(`${environment.apiBaseUrl}/api/eventregister/${registrationId}`, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

}

