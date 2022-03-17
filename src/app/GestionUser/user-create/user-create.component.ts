import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceGestService } from '../user-service-gest.service';
import { User } from "./../user";
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/user-auth.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  msg='';
  form: any = {
    firstname:null,
    lastname:null,
    username: null,
    email: null,
    password: null,
    poste:null};

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userServiceGestService: UserServiceGestService,
    private router: Router) { }

  ngOnInit(): void {
  }

onSubmit(): void {
  const {firstname,lastname, username, email, password,poste} = this.form;

  this.userServiceGestService.registerAdmin(firstname,lastname,username, email, password,poste).subscribe(
    data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      this.router.navigate(['/user-list']) ;  },
      
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    }
  );
}
}