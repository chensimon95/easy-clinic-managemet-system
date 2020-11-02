import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserRole } from './types';

@Injectable()
export class JWTService{

	constructor(private jwtHelper:JwtHelperService){}

	userIsAdmin(): boolean {
		let token: string = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return (this.jwtHelper.decodeToken(token) as User).role === UserRole.Admin;
        } else {
            return false;
        }
	}

	logout(): void {
		localStorage.removeItem("jwt");
	}

	activeTokenIsValid(): boolean {
		let token: string = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        } else {
            return false;
        }
	}

	setActiveToken(token): void {
        localStorage.setItem("jwt", token);
	}
}