import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  canActivate(): boolean {
    let isLoggedIn = false;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      isLoggedIn = true;
    }
    console.log(isLoggedIn);
    if (isLoggedIn) {
      return true;
    }
    return false;
  }
}
