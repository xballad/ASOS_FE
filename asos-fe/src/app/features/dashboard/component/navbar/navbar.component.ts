import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  userEmail: string | null = null;

  constructor(private router: Router,
              private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
  }

  // Method to handle logout
  logout(): void {
    localStorage.removeItem('access_token');  
    this.router.navigate(['/login']);  // Navigate back to the login page
  }

  // Method to navigate to settings
  openSettings(): void {
    this.router.navigate(['/settings']); 
  }
}
