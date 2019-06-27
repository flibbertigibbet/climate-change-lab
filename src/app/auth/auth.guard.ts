import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { apiHost } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(map(isAuthenticated => {
        if (isAuthenticated) {
            return true;
        } else {
            window.location.assign(`${apiHost}/accounts/login/`);
        }
    }));
  }
}
