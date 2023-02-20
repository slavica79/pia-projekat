import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { ParticipantComponent } from './participant/participant.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component'
import { ParticipantProfileComponent } from './participant-profile/participant-profile.component';
import { StudioDetailsComponent } from './studio-details/studio-details.component';
import { BecomeOrganizerComponent } from './become-organizer/become-organizer.component';
import { UpdateStudioComponent } from './update-studio/update-studio.component';
import { OrganizerProfileComponent } from './organizer-profile/organizer-profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  //dodati rute
  {path: '', component: HomeComponent}, //unregistered
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'participant', component: ParticipantComponent},
  {path: 'organizer', component: OrganizerComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'updateProfile', component: UpdateProfileComponent},
  {path: 'participantProfile', component: ParticipantProfileComponent},
  {path: 'studioDetails', component: StudioDetailsComponent},
  {path: 'becomeOrganizer', component: BecomeOrganizerComponent},
  {path: 'updateStudio', component: UpdateStudioComponent},
  {path: 'organizerProfile', component: OrganizerProfileComponent},
  {path: 'adminLogin', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
