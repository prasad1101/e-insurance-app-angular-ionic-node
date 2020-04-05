import { Component, Input } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { from } from 'rxjs';
import { DalProvider } from '../../../providers/dal/dal';
import { ValidProvider } from '../../../providers/valid/valid';
import { HomePage } from '../../../pages/home/home';

@IonicPage()
@Component({
    selector: 'payment-layout-1',
    templateUrl: 'payment.html'
})
export class PaymentLayout1 {
    @Input() data: any;
    @Input() events: any;


    constructor(private dal: DalProvider, private validator: ValidProvider, private navCtrl: NavController) { }

    paymentReq = {
        userId: "",
        cardNo: "",
        cvv: "",
        expiryDate: new Date(),
        amount: "",
        policyNo: ""
    }
    paymentStatus: any;

    paymentVal() {
        this.paymentStatus = null
        if (this.validator.emptyVal(this.paymentReq.userId)) {
            this.paymentStatus = "Please Enter User Name !!";
            console.log("Please Enter User Name !!");
        } else {
            if (this.validator.emptyVal(this.paymentReq.cardNo)) {
                this.paymentStatus = "Please Enter card no !!";
                console.log("Please Enter card no !!")
            }
            else if (this.validator.emptyVal(this.paymentReq.policyNo)) {
                this.paymentStatus = "Please Enter Policy Number !!";
                console.log("Please Enter Policy Number !!")
            }
            else if (this.validator.emptyVal(this.paymentReq.amount)) {
                this.paymentStatus = "Please Enter Amount !!";
                console.log("Please Enter Amount !!")
            }
            else if (this.validator.emptyVal(this.paymentReq.cvv)) {
                this.paymentStatus = "Please Enter CVV !!";
                console.log("Please Enter CVV !!")
            }

        }
        return this.paymentStatus
    }
    userPayment() {


        // console.log(this.validation.emptyVal(this.loginReq.userId), "this is validation service")
        if (null != this.paymentVal()) {
            return
        }
        this.dal.userPayment(this.paymentReq).subscribe(x => {
            console.log(x)
            if (x.amount) {

                console.log("Payment Successful !!")
                this.paymentStatus = "Payment Successful !!";
                this.navCtrl.push(HomePage);
                // window.location.href = `/${environment.baseHref}/#/dashboard`
            } else {
                console.log("Payment Failed !!")
                this.paymentStatus = "Payment Failed !!";
                // window.location.href = `/${environment.baseHref}/#/`
                // Swal.fire('Oops...', 'Username or Password entered is wrong!', 'error')


            }

        }, e => { })

    }



}
