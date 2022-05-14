import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  msg='';
  form: any = {
    firstname:null,
    lastname:null,
    username: null,
    email: null,
    password: null,
    poste:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  router?:Router;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

onSubmit(): void {
  const {firstname,lastname, username, email, password,poste} = this.form;

  this.authService.register(firstname,lastname,username, email, password,poste).subscribe(
    data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      this.router?.navigate(['/login']) ;

    },
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    }
  );
}
}
