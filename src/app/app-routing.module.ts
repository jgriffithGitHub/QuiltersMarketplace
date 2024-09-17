import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CollectionComponent } from './swatch/collection/collection.component';
import { SwatchComponent } from './swatch/swatch/swatch.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { MessageDialogComponent } from './dialogs/message-dialog.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'collection', component: CollectionComponent, canActivate: [AuthGuard] },
  { path: 'swatch/:id/:editable', component: SwatchComponent, canActivate: [AuthGuard] },
  { path: 'swatch/:id', component: SwatchComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [FormsModule, FormGroup, FormControl, Validators,
            HttpClientModule,
            RouterModule.forRoot(routes),
			MatDialogModule,
			MessageDialogComponent],
  exports: [RouterLink,
            RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppRoutingModule]
})

export class AppRoutingModule { }
