import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule } from '@angular/router';
//import { AuthGuard } from './_auth/auth.guard';
//import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { SignupComponent } from './signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserListComponent } from './GestionUser/user-list/user-list.component';
import { UserCreateComponent } from './GestionUser/user-create/user-create.component';
import { UserDetailsComponent } from './GestionUser/user-details/user-details.component';
import { UserUpdateComponent } from './GestionUser/user-update/user-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  
import { NgxPaginationModule } from 'ngx-pagination';
import { UserEnattenteComponent } from './GestionUser/user-enattente/user-enattente.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    SidebarComponent,
    SignupComponent,
    ForgotpasswordComponent,
    ProfileComponent,
    ResetpasswordComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    UserEnattenteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxPaginationModule,
  ],
 /* providers: [
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true},
      UserService
  ],*/
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
