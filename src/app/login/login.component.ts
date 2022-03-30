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

  background:string="../../assets/images/neodoc.png";


  form: any = { username: null, password: null };
  isLoggedIn = false;
  isLoginFailed = true;
  roles: string[] = [];
  errorMessage = '';
  username="";

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username=this.tokenStorage.getUser().username;
      console.log(this.roles);}
    }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
     
      next => {
        this.tokenStorage.saveToken(next.accessToken);
        this.tokenStorage.saveUser(next);
        this.roles = this.tokenStorage.getUser().roles;
        this.username=this.tokenStorage.getUser().username;
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['/profile']);
        this.reloadPage();

      },
      
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
       // this.errorMessage="données érronées , merci de les vérifier.";
      }
     );

  }
  
  reloadPage(): void {
    window.location.reload();
  }
}
