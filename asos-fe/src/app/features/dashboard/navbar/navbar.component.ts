import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

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
