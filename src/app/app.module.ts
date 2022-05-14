import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule } from '@angular/router';
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
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { DocUploadComponent } from './GestionDoc/doc-upload/doc-upload.component';
import { ProgressComponent } from './GestionDoc/progress/progress.component';
import { DndDirective } from './GestionDoc/dnd.directive';
import { NgxDocViewerModule } from 'ngx-doc-viewer';  
import { DocViewComponent } from './GestionDoc/doc-view/doc-view.component';
import { DocFavComponent } from './GestionDoc/doc-fav/doc-fav.component';
import { MatChipsModule } from '@angular/material/chips';
import { FileUploadModule } from 'ng2-file-upload';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CommonModule} from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {DialogModule, Dialog} from 'primeng/dialog';
import { DocByDepComponent } from './GestionDoc/doc-by-dep/doc-by-dep.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
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
    DocUploadComponent,
    ProgressComponent,
    DndDirective,
    DocViewComponent,
    DocFavComponent,
    DocByDepComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatInputModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxPaginationModule,
    MatFormFieldModule,
    AngularFileUploaderModule,
    NgxDocViewerModule,
    MatChipsModule,
    FileUploadModule,
    AutoCompleteModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DialogModule,
    PdfViewerModule,

  ],
 

  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
