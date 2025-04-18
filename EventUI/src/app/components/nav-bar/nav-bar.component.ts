import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { User } from '../../features/auth/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  user? : User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next : (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();   // after refreshing the page, we need to get the user from local storage
  }

  logOut() : void {
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }


}


