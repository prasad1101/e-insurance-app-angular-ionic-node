import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings';

@Injectable()
export class HomeService {

    constructor(public af: AngularFireDatabase) { }

    // Set data for - HOME PAGE
    getData = () => {
        return {
            "toolbarTitle": "Welcome to E-Insurance App",
            "title": "Online Insurance App",
            "subtitle": "For Mobile",
            "subtitle2": "Insure And Be Secure !!",

            "background": "https://res.cloudinary.com/brainethic/image/upload/v1546862799/WhatsApp_Image_2019-01-07_at_5.33.29_PM_fouj6p.jpg"
        };
    };

    load(): Observable<any> {
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('home')
                    .valueChanges()
                    .subscribe(snapshot => {
                        observer.next(snapshot);
                        observer.complete();
                    }, err => {
                        observer.error([]);
                        observer.complete();
                    });
            });
        } else {
            return new Observable(observer => {
                observer.next(this.getData());
                observer.complete();
            });
        }
    }
}
