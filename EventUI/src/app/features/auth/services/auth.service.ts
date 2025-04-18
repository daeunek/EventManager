import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { RegisterRequest } from '../models/login-request copy';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService : CookieService) { }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/auth/register`, {
      email: request.email,
      password: request.password
    });
  }
  
  login(request: LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email : request.email,
      password : request.password
    });
  }

  setUser(user : User) : void {
    this. $user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }


  // get user from local storage make sure nav bar not change if it is refrehed
  getUser() : User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user : User = {
        email : email,
        roles : roles.split(',')
      }
      return user;
    };
    return undefined;

  }

  logOut() : void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
