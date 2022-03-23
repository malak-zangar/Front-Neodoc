import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { UserAuthService } from './user-auth.service';

const API_URL = 'http://localhost:9090/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}

/*@Injectable({
  providedIn: 'root',
})*/

/*
export class UserService {
  //PATH_OF_API = 'http://localhost:9091';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: any) {
    //return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
        return this.httpclient.post('http://localhost:9090/api/auth/signin', loginData, {
    headers: this.requestHeader,
    });
  }

  public signup(signupData: any) {
    //return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', signupData, {
      return this.httpclient.post('http://localhost:9090/api/auth/signup', signupData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    //return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      return this.httpclient.get('http://localhost:9090/api/test/user', {
      responseType: 'text',
    });
  }
  


  public forAdmin() {
    //return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      return this.httpclient.get('http://localhost:9090/api/test/admin', {  
    responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: any): boolean {

    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}*/

