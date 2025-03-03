import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { IAuthService } from '../services/auth-service';
import { AUTH_SERVICE } from '../services/auth-token';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject<IAuthService>(AUTH_SERVICE);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    return this.router.parseUrl('/login');
  }
}
