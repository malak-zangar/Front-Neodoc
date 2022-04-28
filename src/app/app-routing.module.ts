import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import{ResetpasswordComponent} from './resetpassword/resetpassword.component';
import { UserListComponent } from './GestionUser/user-list/user-list.component';
import { UserCreateComponent } from './GestionUser/user-create/user-create.component';
import {UserDetailsComponent} from './GestionUser/user-details/user-details.component';
import { UserUpdateComponent } from './GestionUser/user-update/user-update.component';
import { UserEnattenteComponent } from './GestionUser/user-enattente/user-enattente.component';
import { DocUploadComponent } from './GestionDoc/doc-upload/doc-upload.component';
import { DocViewComponent } from './GestionDoc/doc-view/doc-view.component';
import { DocFavComponent } from './GestionDoc/doc-fav/doc-fav.component';
import { DocByDepComponent } from './GestionDoc/doc-by-dep/doc-by-dep.component';
//import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent},
  {path:'user',component:UserComponent },
  {path:'login',component:LoginComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path: 'profile', component: ProfileComponent },
  {path:'resetpassword',component:ResetpasswordComponent},
  {path:'user-list',component:UserListComponent},
  {path:'user-create',component:UserCreateComponent},
  {path:'user-details/:id',component:UserDetailsComponent},
  {path:'user-update/:id',component:UserUpdateComponent},
  {path:'user-enattente',component:UserEnattenteComponent},
  {path:'doc-upload',component:DocUploadComponent},
  {path:'doc-view',component:DocViewComponent},
  {path:'doc-fav',component:DocFavComponent},
  {path:'',component:HomeComponent},
  {path:'search/:searchTerm',component:DocViewComponent},
  {path:'doc-bydep',component:DocByDepComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
