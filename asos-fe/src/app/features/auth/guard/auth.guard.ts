import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service.service';  // Your AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;  // User is logged in, allow access
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
      return false;
    }
  }
}
