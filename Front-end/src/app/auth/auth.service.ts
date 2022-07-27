import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginHandler } from '../services/login-handler.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginHandler: LoginHandler
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.loginHandler.userValue;
        if (user) {
            return true;
        }

        this.router.navigate(['login-screen'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}