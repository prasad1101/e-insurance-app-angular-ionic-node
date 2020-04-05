import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { PaymentComponent } from './component/payment/payment.component';
import { UserDataComponent } from './component/user-data/user-data.component';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { PaymentHistoryComponent } from './component/payment-history/payment-history.component';

import { UserListComponent } from './component/user-list/user-list.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NgxLocalCacheModule } from 'ngx-local-cache'
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    RegisterPageComponent,
    UserProfileComponent,
    PaymentComponent,
    UserDataComponent,
    HeaderComponent,
    FooterComponent,
    PaymentHistoryComponent,

    UserListComponent,

    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLocalCacheModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
