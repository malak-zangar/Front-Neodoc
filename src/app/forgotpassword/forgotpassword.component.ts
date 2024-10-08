import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  form: any = {email: null};
  isSuccessful = true;
  isForgotPasswordFailed = false;
  errorMessage = '';
 // router?:Router;

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }

onSubmit(): void {
  const {email} = this.form;

  this.authService.forgotpassword(email).subscribe(
    data => {
      console.log(data);
      this.isForgotPasswordFailed = false;
      this.isSuccessful = true;
    },
    err => {
      this.isForgotPasswordFailed = true;
      this.isSuccessful=false;
     // this.errorMessage = err.error.message;
    // this.errorMessage="cet email n'existe pas";
    }
  );

setTimeout(() => {this.router.navigate(['/home']);},5000);
}
}


