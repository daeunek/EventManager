import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import {jwtDecode} from 'jwt-decode';;

export const authGuard: CanActivateFn = (route, state) => {
  // check if the user is logged 
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  // check for jwt token,
  let token = cookieService.get('Authorization');
  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token); 
    
    // check if the token is expired
    const expDate = decodedToken.exp * 1000; // convert to milliseconds
    const currentTime = new Date().getTime();
    
    if (expDate < currentTime) {
      // token is expired
      authService.logOut();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } }); //params will store the url that they try try to access 
    } else {
      // token is valid
      if (user.roles.includes('Admin')) {
        return true;
      } else {
        alert('You are not authorized to access this page');
        return router.createUrlTree(['/']);
      }
    }
  } else {
    //log out
    authService.logOut();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } }); //params will store the url that they were redirected
  }
};