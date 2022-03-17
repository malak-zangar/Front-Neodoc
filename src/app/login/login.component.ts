import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/user-auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = { username: null, password: null };
  isLoggedIn = false;
  //isLoginFailed = true;
  roles: string[] = [];
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles; }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
     
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(data);
        this.roles = this.tokenStorage.getUser().roles;
        //this.isLoggedIn = true;
       // this.isLoginFailed = false;
        this.reloadPage();
        this.router.navigate(['/user']);

      },
      err => {
       // this.errorMessage = err.error.message;
        //this.isLoginFailed = true;
        this.errorMessage="données érronées , merci de les vérifier.";
      }
     );

  }
  
  reloadPage(): void {
    window.location.reload();
  }
}
