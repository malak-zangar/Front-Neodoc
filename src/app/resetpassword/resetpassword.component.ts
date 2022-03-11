import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  msg='';
  form: any = {password: null};
  isSuccessful = false;
  isResetPasswordFailed = false;
  errorMessage = '';
  router?:Router;
  token: string;
  constructor(private authService: AuthService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.token=params['token'];
      console.log("hi",this.token); 
    });
  }

onSubmit(): void {
  const {password} = this.form;
 this.authService.resetpassword(this.token,password).subscribe(

    data => {
      console.log(data);
      this.isSuccessful = true;
      this.isResetPasswordFailed = false;
      this.router?.navigate(['/login']) ;

    },
    err => {
      this.errorMessage = err.error.message;
      this.isResetPasswordFailed = true;
    }
  );
}
}

