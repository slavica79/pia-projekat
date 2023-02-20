import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { ParticipantComponent } from './participant/participant.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ParticipantProfileComponent } from './participant-profile/participant-profile.component';
import { StudioDetailsComponent } from './studio-details/studio-details.component';
import { BecomeOrganizerComponent } from './become-organizer/become-organizer.component';
import { UpdateStudioComponent } from './update-studio/update-studio.component';
import { DatePipe } from '@angular/common';
import { OrganizerProfileComponent } from './organizer-profile/organizer-profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ParticipantComponent,
    OrganizerComponent,
    AdminComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    ParticipantProfileComponent,
    StudioDetailsComponent,
    BecomeOrganizerComponent,
    UpdateStudioComponent,
    OrganizerProfileComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
