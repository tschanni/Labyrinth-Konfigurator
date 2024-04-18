import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private jwtHelper: JwtHelperService,
    private router: Router) {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(token: any, user:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(token));
    window.sessionStorage.setItem('username', JSON.stringify(user));
  }


  public getUser(): string {
    const user = window.sessionStorage.getItem('username');
    if (user) {
      return JSON.parse(user);
    }

    return "";
  }

  public getToken(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      try {
        if(this.jwtHelper.isTokenExpired(user))
        {
          return false;
        }
        return true;
      }
      catch {
        window.sessionStorage.clear();
      }      
    }

    return false;
  }

  public redirectIfLoggedIn(path: string, args: number | null = null): void {
    if(this.isLoggedIn())
    {
      if(args)
        this.router.navigate([path, args])
      else
        this.router.navigate([path])
    }
    else
    {
      this.router.navigate(['/login'])
    }

  }
}
