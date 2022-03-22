/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')!;
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:9090/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(firstname:string,lastname:string, username: string, email: string, password: string,poste:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstname,
      lastname,
      username,
      email,
      password,
      poste
    }, httpOptions);
  }

  forgotpassword(email:string): Observable<any> {
    return this.http.post(AUTH_API+'forgot-password',{email}, httpOptions);
  }

  resetpassword(token:string,password:string): Observable<any> {
    return this.http.put(AUTH_API +'reset-password',{token,password},httpOptions);}
}



