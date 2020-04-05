import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { PaymentComponent } from './component/payment/payment.component';

import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserDataComponent } from './component/user-data/user-data.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { RegisterPageComponent } from './component/register-page/register-page.component';
import { PaymentHistoryComponent } from './component/payment-history/payment-history.component';

import { UserListComponent } from './component/user-list/user-list.component';


const routes: Routes = [

  {
    path: '', component: LoginPageComponent
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'get-data', component: UserDataComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: 'user-list', component: UserListComponent },
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
