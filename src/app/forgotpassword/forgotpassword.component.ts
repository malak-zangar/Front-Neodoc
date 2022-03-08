import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  msg='';
  form: any = {email: null};
  isSuccessful = false;
  isForgotPasswordFailed = false;
  errorMessage = '';
  router?:Router;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

onSubmit(): void {
  const {email} = this.form;

  this.authService.forgotpassword(email).subscribe(
    data => {
      console.log(data);
      this.isSuccessful = true;
      this.isForgotPasswordFailed = false;
      this.router?.navigate(['/login']) ;

    },
    err => {
      this.errorMessage = err.error.message;
      this.isForgotPasswordFailed = true;
    }
  );
}
}
