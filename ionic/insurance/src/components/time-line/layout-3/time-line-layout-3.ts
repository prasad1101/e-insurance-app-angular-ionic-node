import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DalProvider } from '../../../providers/dal/dal'
@IonicPage()
@Component({
    selector: 'time-line-layout-3',
    templateUrl: 'time-line.html'
})
export class TimeLineLayout3 {
    @Input('data') data: any;
    @Input('events') events: any;
    payments: any;
    constructor(private dal: DalProvider) { }
    ngOnInit() {

        this.getPaymentList();
    }

    getPaymentList() {

        this.dal.getPayment().subscribe(y => {

            this.payments = y;
            console.log("page.ts>>>>>", y);

        })

    }


}
