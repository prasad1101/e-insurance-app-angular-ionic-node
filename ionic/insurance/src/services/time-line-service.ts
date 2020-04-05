import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'
import { DalProvider } from '../providers/dal/dal';

@Injectable()
export class TimeLineService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService, private dal: DalProvider) { }

    getId = (): string => 'timeline';

    getTitle = (): string => 'Payment History';

    getAllThemes = (): Array<any> => {
        return [

            { "title": "Payment History", "theme": "layout3" },
        ];
    };

    getDataForTheme = (menuItem: any): any => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            "onItemClick": function (item: any) {
                that.toastCtrl.presentToast(item.title);
            }
        };
    };

    payments: any;

    getDataForLayout3 = (): any => {


        // return {
        //     "items": [
        //         {
        //             "id": 1,
        //             "time": "TODAY AT 2:20PM",
        //             "avatar": "https://res.cloudinary.com/brainethic/image/upload/v1520613022/prasad_zlt5l2.jpg",
        //             "title": "Prasad Pawar",
        //             "subtitle": "Paid : 1200 INR",
        //             "description": "For Policy no. 912365478963"
        //         },
        //         {
        //             "id": 2,
        //             "time": "TODAY AT 1:30PM",
        //             "avatar": "assets/images/avatar/11.jpg",
        //             "title": "Bhushan Pawar",
        //             "subtitle": "Paid : 12000 INR",
        //             "description": "For Policy no. 912365478963"
        //         },
        //         {
        //             "id": 3,
        //             "time": "TODAY AT 14:20PM",
        //             "avatar": "assets/images/avatar/12.jpg",
        //             "title": "Ankita Pawar",
        //             "subtitle": "Paid : 3200 INR",
        //             "description": "For Policy no. 912365478963"
        //         },
        //         {
        //             "id": 4,
        //             "time": "TODAY AT 14:20PM",
        //             "avatar": "https://res.cloudinary.com/brainethic/image/upload/v1520613022/prasad_zlt5l2.jpg",
        //             "title": "Pranav Pawar",
        //             "subtitle": "Paid : 4200 INR",
        //             "description": "For Policy no. 912365478963"
        //         }
        //     ]
        // };
    };

    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: [],
            events: this.getEventsForTheme(item)
        };
        result[this.getShowItemId(item)] = true;
        return result;
    };

    getShowItemId = (item: any): string => {
        return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
    }

    load(item: any): Observable<any> {
        var that = this;
        that.loadingService.show();
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('timeline/' + item.theme)
                    .valueChanges()
                    .subscribe(snapshot => {
                        that.loadingService.hide();
                        observer.next(snapshot);
                        observer.complete();
                    }, err => {
                        that.loadingService.hide();
                        observer.error([]);
                        observer.complete();
                    });
            });
        } else {
            return new Observable(observer => {
                that.loadingService.hide();
                observer.next(this.getDataForTheme(item));
                observer.complete();
            });
        }
    }
}
