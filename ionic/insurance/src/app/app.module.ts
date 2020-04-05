import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, ApplicationInitStatus, ApplicationRef } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppSettings } from '../services/app-settings'
import { ToastService } from '../services/toast-service'
import { LoadingService } from '../services/loading-service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { CustomHttpProvider } from '../providers/custom-http/custom-http';
import { DalProvider } from '../providers/dal/dal';
import { ValidProvider } from '../providers/valid/valid';
import { UtilityProvider } from '../providers/utility/utility';
import { SettersandgettersProvider } from '../providers/settersandgetters/settersandgetters';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio';


@NgModule({
    declarations: [MyApp],
    providers: [
        StatusBar, SplashScreen, BarcodeScanner, Camera,
        ToastService, LoadingService,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CustomHttpProvider,
        DalProvider,
        ApplicationInitStatus,
        ApplicationRef,
        DalProvider,
        ValidProvider,
        UtilityProvider,
        SettersandgettersProvider,
        /* FingerprintAIO */




    ],
    imports: [

        HttpModule, HttpClientModule, BrowserModule,
        AngularFireModule.initializeApp(AppSettings.FIREBASE_CONFIG),
        AngularFireDatabaseModule, AngularFireAuthModule,
        IonicModule.forRoot(MyApp),

    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
